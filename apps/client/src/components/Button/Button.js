import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
import css from './Button.module.css';
export default function Button({ variant, text, onClick, disabled, type = 'button', }) {
    return (_jsx("button", { className: clsx(css.button, variant && css[variant]), type: type, onClick: onClick, disabled: disabled, children: text }));
}
