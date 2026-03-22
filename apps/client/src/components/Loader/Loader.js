import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import css from './Loader.module.css';
export default function Loader() {
    return (_jsx(_Fragment, { children: _jsx("p", { className: css.text, children: "Loading, please wait..." }) }));
}
