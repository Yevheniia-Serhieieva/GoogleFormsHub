import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import css from './SearchBox.module.css';
export default function SearchBox({ value, onSearchChange }) {
    return (_jsx(_Fragment, { children: _jsx("input", { onChange: (e) => onSearchChange(e.target.value), value: value, className: css.input, type: "text", placeholder: "Search forms" }) }));
}
