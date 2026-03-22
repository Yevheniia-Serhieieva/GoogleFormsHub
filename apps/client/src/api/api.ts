import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Form, QuestionInput, Response } from '@shared/types';

type CreateFormRequest = {
  title: string;
  description?: string;
  questions?: QuestionInput[];
};

type CreateFormResponse = {
  createForm: Form;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000',
  }),
  endpoints: (builder) => ({
    createForm: builder.mutation<Form, CreateFormRequest>({
      query: (body) => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: `
            mutation CreateForm($title: String!, $description: String, $questions: [QuestionInput!]) {
              createForm(title: $title, description: $description, questions: $questions) {
                id
                title
                description
                questions {
                  id
                  title
                  type
                  options
                }
              }
            }
          `,
          variables: body,
        },
      }),
      transformResponse: (response: { data: CreateFormResponse }) =>
        response.data.createForm,
    }),
    getForms: builder.query<Form[], void>({
      query: () => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: `query {forms {id title description}}`,
        },
      }),
      transformResponse: (res: { data: { forms: Form[] } }) => res.data.forms,
    }),
    getForm: builder.query<Form, string>({
      query: (id) => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: ` query($id: ID!) {form(id: $id) {id title questions {id title type options}}}`,
          variables: { id },
        },
      }),
      transformResponse: (res: { data: { form: Form } }) => res.data.form,
    }),
    submitResponse: builder.mutation<
      { id: string },
      { formId: string; answers: { questionId: string; value: string }[] }
    >({
      query: (body) => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: `
          mutation($formId: ID!, $answers: [AnswerInput!]!) {
          submitResponse(formId: $formId, answers: $answers) {
            id
          }
        }
      `,
          variables: body,
        },
      }),
    }),
    getResponses: builder.query<
      { id: string; answers: { questionId: string; value: string }[] }[],
      string
    >({
      query: (formId: string) => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: `
          query($formId: ID!) {
          responses(formId: $formId) {
            id
            answers {
              questionId
              value
            }
          }
        }
      `,
          variables: { formId },
        },
      }),
      transformResponse: (res: { data: { responses: Response[] } }) =>
        res.data.responses,
    }),
  }),
});

export const {
  useCreateFormMutation,
  useGetFormsQuery,
  useGetFormQuery,
  useSubmitResponseMutation,
  useGetResponsesQuery,
} = api;
