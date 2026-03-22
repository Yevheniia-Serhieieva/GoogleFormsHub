import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useGetFormsQuery } from '../../api/api';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import FormList from '../FormList/FormList';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';
export default function HomePage() {
    const { data, isLoading, isError } = useGetFormsQuery();
    if (isLoading)
        return _jsx(Loader, {});
    if (isError)
        return _jsx(ErrorMessage, {});
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsx(FormList, { forms: data ?? [] })] }));
}
