import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Button from '../Button/Button';
import SearchBox from '../SearchBox/SearchBox';
import { setSearch } from './headerSlice';
import css from './Header.module.css';
export default function Header() {
    const dispatch = useAppDispatch();
    const search = useAppSelector((state) => state.header.search);
    const handleSearch = (value) => {
        dispatch(setSearch(value));
    };
    const navigate = useNavigate();
    return (_jsx(_Fragment, { children: _jsxs("div", { className: css.header, children: [_jsx(SearchBox, { value: search, onSearchChange: handleSearch }), _jsx(Button, { variant: "primary", text: "Create form", onClick: () => navigate('/forms/new') })] }) }));
}
