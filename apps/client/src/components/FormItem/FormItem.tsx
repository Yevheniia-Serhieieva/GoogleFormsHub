import {
  Field,
  Form as FormikForm,
  Formik,
  FieldArray,
  type FormikHelpers,
} from 'formik';
import * as Yup from 'yup';
import Button from '../Button/Button';
import type { QuestionType } from '@shared/types';
import css from './FormItem.module.css';
import { useCreateFormMutation } from '../../api/api';
import { ErrorMessage as FormikError } from 'formik';
import SuccessMessage from '../SuccessMessage/SuccessMessage';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useNavigate } from 'react-router-dom';

type QuestionForm = {
  title: string;
  type: QuestionType;
  options: string[];
};

type FormValues = {
  title: string;
  description: string;
  questions: QuestionForm[];
};

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .min(3, 'Title too short')
    .max(50, 'Title too long')
    .required('Title is required'),
  description: Yup.string().max(500, 'Description is too long'),
  questions: Yup.array().of(
    Yup.object({
      title: Yup.string().required('Question title required'),
      type: Yup.string().required(),
      options: Yup.array().when('type', {
        is: (type: QuestionType) =>
          type === 'MULTIPLE_CHOICE' || type === 'CHECKBOX',
        then: (schema) => schema.min(1, 'At least one option is required'),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
  ),
});

export default function FormItem() {
  const initialValues: FormValues = {
    title: '',
    description: '',
    questions: [],
  };

  const navigate = useNavigate();

  const [createForm, { isLoading, isError, isSuccess }] =
    useCreateFormMutation();

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    try {
      await createForm({
        title: values.title,
        description: values.description,
        questions: values.questions.map((q) => ({
          title: q.title,
          type: q.type,
          options:
            q.type === 'MULTIPLE_CHOICE' || q.type === 'CHECKBOX'
              ? q.options
              : [],
        })),
      }).unwrap();

      actions.resetForm();

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.error('Error creating form', error);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <FormikForm className={css.form}>
            <Field
              name="title"
              placeholder="Form title"
              className={css.field}
            />
            <FormikError name="title" component="p" className={css.error} />

            <Field
              name="description"
              placeholder="Description"
              className={css.field}
            />
            <FormikError
              name="description"
              component="p"
              className={css.error}
            />

            <FieldArray name="questions">
              {({ push, remove }) => (
                <div>
                  {values.questions.map((q, index) => (
                    <div key={index} className={css.question}>
                      <Field
                        name={`questions.${index}.title`}
                        placeholder="Question title"
                      />
                      <FormikError
                        name={`questions.${index}.title`}
                        component="p"
                        className={css.error}
                      />

                      <Field as="select" name={`questions.${index}.type`}>
                        <option value="TEXT">Text</option>
                        <option value="MULTIPLE_CHOICE">Multiple choice</option>
                        <option value="CHECKBOX">Checkbox</option>
                        <option value="DATE">Date</option>
                      </Field>
                      <FormikError
                        name={`questions.${index}.options`}
                        component="p"
                        className={css.error}
                      />

                      {(q.type === 'MULTIPLE_CHOICE' ||
                        q.type === 'CHECKBOX') && (
                        <FieldArray name={`questions.${index}.options`}>
                          {({ push: pushOption, remove: removeOption }) => (
                            <div>
                              {q.options.map((_, optIndex) => (
                                <div key={optIndex} className={css.optionWrap}>
                                  <Field
                                    name={`questions.${index}.options.${optIndex}`}
                                    placeholder="Option"
                                  />
                                  <Button
                                    type="button"
                                    text="-"
                                    onClick={() => removeOption(optIndex)}
                                  ></Button>
                                </div>
                              ))}

                              <Button
                                type="button"
                                text="Add option"
                                onClick={() => pushOption('')}
                              ></Button>
                            </div>
                          )}
                        </FieldArray>
                      )}

                      <div>
                        <Button
                          type="button"
                          text="Remove question"
                          onClick={() => remove(index)}
                        ></Button>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="tertiary"
                    text="Add question"
                    onClick={() =>
                      push({
                        title: '',
                        type: 'TEXT',
                        options: [],
                      })
                    }
                  ></Button>
                </div>
              )}
            </FieldArray>
            <div>
              <Button
                type="submit"
                variant="primary"
                text={isLoading ? 'Creating...' : 'Create form'}
                disabled={isLoading}
              />
            </div>
          </FormikForm>
        )}
      </Formik>

      <div className={css.wrap}>
        <Button
          variant="tertiary"
          text="Home page"
          onClick={() => navigate(`/`)}
        ></Button>
      </div>

      {isError && <ErrorMessage text="Failed to create form" />}
      {isSuccess && <SuccessMessage />}
    </>
  );
}
