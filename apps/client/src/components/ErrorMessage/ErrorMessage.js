import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import css from './ErrorMessage.module.css';
export default function ErrorMessage({ text }) {
    return (_jsx(_Fragment, { children: _jsx("p", { className: css.error, children: text || 'There was an error, please try again...' }) }));
}
