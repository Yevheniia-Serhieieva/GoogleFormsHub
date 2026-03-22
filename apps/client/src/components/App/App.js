import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import FormFillPage from '../pages/FormFillPage/FormFillPage';
import FormResponsesPage from '../pages/FormResponsesPage/FormResponsesPage';
import FormBuilderPage from '../pages/FormBuilderPage';
export default function App() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/forms/new", element: _jsx(FormBuilderPage, {}) }), _jsx(Route, { path: "/forms/:id/fill", element: _jsx(FormFillPage, {}) }), _jsx(Route, { path: "/forms/:id/responses", element: _jsx(FormResponsesPage, {}) })] }));
}
