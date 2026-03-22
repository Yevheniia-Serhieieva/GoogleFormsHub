import { forms, responses, generateId } from './store';
import {
  Form,
  QuestionInput,
  AnswerInput,
  Response as ResponseType,
} from '@shared/types';

type QueryArgs = {
  form?: { id: string };
  responses?: { formId: string };
};

type MutationArgs = {
  createForm: {
    title: string;
    description?: string;
    questions?: QuestionInput[];
  };
  submitResponse: {
    formId: string;
    answers?: AnswerInput[];
  };
};

export const resolvers = {
  Query: {
    forms: (): Form[] => {
      return Array.from(forms.values());
    },

    form: (_parent: null, args: QueryArgs['form']): Form | null => {
      if (!args) return null;
      return forms.get(args.id) ?? null;
    },

    responses: (
      _parent: null,
      args: QueryArgs['responses'],
    ): ResponseType[] => {
      if (!args) return [];
      return responses.get(args.formId) ?? [];
    },
  },

  Mutation: {
    createForm: (_parent: null, args: MutationArgs['createForm']): Form => {
      const { title, description, questions } = args;

      const id = generateId();

      const processedQuestions = (questions ?? []).map((q) => {
        if (
          (q.type === 'MULTIPLE_CHOICE' || q.type === 'CHECKBOX') &&
          (!q.options || q.options.length === 0)
        ) {
          throw new Error('Options are required for this question type');
        }

        return {
          id: generateId(),
          title: q.title,
          type: q.type,
          options: q.options ?? [],
        };
      });

      const form: Form = {
        id,
        title,
        description,
        questions: processedQuestions,
      };

      forms.set(id, form);

      return form;
    },

    submitResponse: (
      _parent: null,
      args: MutationArgs['submitResponse'],
    ): ResponseType => {
      const { formId, answers } = args;

      if (!formId) {
        throw new Error('formId is required');
      }

      const form = forms.get(formId);

      if (!form) {
        throw new Error(`Form with id ${formId} not found`);
      }

      const safeAnswers = answers ?? [];

      safeAnswers.forEach((a) => {
        const question = form.questions.find((q) => q.id === a.questionId);

        if (!question) {
          throw new Error(`Question ${a.questionId} not found`);
        }
      });

      const response: ResponseType = {
        id: generateId(),
        formId,
        answers: safeAnswers,
      };

      const existing = responses.get(formId) ?? [];
      existing.push(response);

      responses.set(formId, existing);

      return response;
    },
  },
};
