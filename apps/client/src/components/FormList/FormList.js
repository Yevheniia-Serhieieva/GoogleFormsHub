import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import css from './FormList.module.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
export default function FormList({ forms }) {
    const navigate = useNavigate();
    return (_jsx(_Fragment, { children: _jsx("ul", { className: css.list, children: forms.map((form) => (_jsxs("li", { className: css.item, children: [_jsx("h2", { className: css.title, children: form.title }), form.description && (_jsx("p", { className: css.description, children: form.description })), _jsxs("div", { className: css.wrap, children: [_jsx(Button, { variant: "secondary", text: "View responses", onClick: () => navigate(`/forms/${form.id}/responses`) }), _jsx(Button, { text: "Fill form", onClick: () => navigate(`/forms/${form.id}/fill`) })] })] }, form.id))) }) }));
}
