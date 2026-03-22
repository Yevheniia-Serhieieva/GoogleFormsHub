import type { RootState } from './store';
import type { TypedUseSelectorHook } from 'react-redux';
export declare const useAppDispatch: () => import("redux-thunk").ThunkDispatch<{
    header: {
        search: string;
    };
    api: import("@reduxjs/toolkit/query").CombinedState<{
        createForm: import("@reduxjs/toolkit/query").MutationDefinition<{
            title: string;
            description?: string;
            questions?: import("@shared/types").QuestionInput[];
        }, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, never, import("@shared/types").Form, "api", unknown>;
        getForms: import("@reduxjs/toolkit/query").QueryDefinition<void, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, never, import("@shared/types").Form[], "api", unknown>;
        getForm: import("@reduxjs/toolkit/query").QueryDefinition<string, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, never, import("@shared/types").Form, "api", unknown>;
        submitResponse: import("@reduxjs/toolkit/query").MutationDefinition<{
            formId: string;
            answers: {
                questionId: string;
                value: string;
            }[];
        }, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, never, {
            id: string;
        }, "api", unknown>;
        getResponses: import("@reduxjs/toolkit/query").QueryDefinition<string, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@reduxjs/toolkit/query").FetchArgs, unknown, import("@reduxjs/toolkit/query").FetchBaseQueryError, {}, import("@reduxjs/toolkit/query").FetchBaseQueryMeta>, never, {
            id: string;
            answers: {
                questionId: string;
                value: string;
            }[];
        }[], "api", unknown>;
    }, never, "api">;
}, undefined, import("redux").UnknownAction> & import("redux").Dispatch<import("redux").UnknownAction>;
export declare const useAppSelector: TypedUseSelectorHook<RootState>;
