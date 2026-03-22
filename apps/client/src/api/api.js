import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000',
    }),
    endpoints: (builder) => ({
        createForm: builder.mutation({
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
            transformResponse: (response) => response.data.createForm,
        }),
        getForms: builder.query({
            query: () => ({
                url: '/graphql',
                method: 'POST',
                body: {
                    query: `query {forms {id title description}}`,
                },
            }),
            transformResponse: (res) => res.data.forms,
        }),
        getForm: builder.query({
            query: (id) => ({
                url: '/graphql',
                method: 'POST',
                body: {
                    query: ` query($id: ID!) {form(id: $id) {id title questions {id title type options}}}`,
                    variables: { id },
                },
            }),
            transformResponse: (res) => res.data.form,
        }),
        submitResponse: builder.mutation({
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
        getResponses: builder.query({
            query: (formId) => ({
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
            transformResponse: (res) => res.data.responses,
        }),
    }),
});
export const { useCreateFormMutation, useGetFormsQuery, useGetFormQuery, useSubmitResponseMutation, useGetResponsesQuery, } = api;
