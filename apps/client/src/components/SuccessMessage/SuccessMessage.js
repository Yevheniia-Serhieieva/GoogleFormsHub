import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import css from './SuccessMessage.module.css';
export default function SuccessMessage() {
    return (_jsx(_Fragment, { children: _jsx("p", { className: css.success, children: "Form created successfully!" }) }));
}
