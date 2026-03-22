type HeaderState = {
    search: string;
};
export declare const setSearch: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "header/setSearch">, clearSearch: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"header/clearSearch">;
export declare const headerReducer: import("redux").Reducer<HeaderState>;
export {};
