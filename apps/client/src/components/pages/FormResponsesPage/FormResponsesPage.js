import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate, useParams } from 'react-router-dom';
import { useGetFormQuery, useGetResponsesQuery } from '../../../api/api';
import Loader from '../../Loader/Loader';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import css from './FormResponsesPage.module.css';
import Button from '../../Button/Button';
export default function FormResponsesPage() {
    const { id } = useParams();
    const { data: responses, isLoading, isError } = useGetResponsesQuery(id);
    const { data: form } = useGetFormQuery(id);
    const navigate = useNavigate();
    if (isLoading)
        return _jsx(Loader, {});
    if (isError)
        return _jsx(ErrorMessage, { text: "Failed to load responses" });
    if (!responses || !form)
        return null;
    return (_jsxs("div", { className: css.container, children: [_jsx("h1", { className: css.title, children: "Responses" }), responses.map((r, index) => (_jsxs("div", { className: css.card, children: [_jsxs("h2", { className: css.responseTitle, children: ["Response #", index + 1] }), r.answers.map((a) => {
                        const question = form.questions.find((q) => q.id === a.questionId);
                        return (_jsxs("div", { className: css.row, children: [_jsx("p", { className: css.question, children: question?.title || 'Unknown question' }), _jsx("p", { className: css.answer, children: a.value })] }, a.questionId));
                    })] }, r.id))), _jsx("div", { children: _jsx(Button, { variant: "primary", text: "Home page", onClick: () => navigate(`/`) }) })] }));
}
