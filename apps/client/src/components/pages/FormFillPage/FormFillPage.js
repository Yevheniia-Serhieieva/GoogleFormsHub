import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate, useParams } from 'react-router-dom';
import { useGetFormQuery, useSubmitResponseMutation } from '../../../api/api';
import Button from '../../Button/Button';
import Loader from '../../Loader/Loader';
import { useState } from 'react';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import css from './FormFillPage.module.css';
export default function FormFillPage() {
    const { id } = useParams();
    const { data: form, isLoading } = useGetFormQuery(id);
    const [submitResponse, { isError }] = useSubmitResponseMutation();
    const [validationError, setValidationError] = useState(null);
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();
    const handleSubmit = async () => {
        if (!form || !id)
            return;
        if (Object.keys(answers).length !== form.questions.length) {
            setValidationError('Please answer all questions');
            return;
        }
        await submitResponse({
            formId: id,
            answers: Object.entries(answers).map(([questionId, value]) => ({
                questionId,
                value: Array.isArray(value) ? value.join(', ') : value,
            })),
        });
        setTimeout(() => {
            navigate('/');
        }, 1000);
    };
    const handleChange = (questionId, value, isCheckbox) => {
        setValidationError(null);
        setAnswers((prev) => {
            if (isCheckbox) {
                const current = prev[questionId] || [];
                if (current.includes(value)) {
                    return {
                        ...prev,
                        [questionId]: current.filter((v) => v !== value),
                    };
                }
                return {
                    ...prev,
                    [questionId]: [...current, value],
                };
            }
            return {
                ...prev,
                [questionId]: value,
            };
        });
    };
    if (!form)
        return _jsx(Loader, {});
    return (_jsxs("div", { className: css.container, children: [_jsx("h1", { className: css.title, children: form.title }), form.questions.map((q) => (_jsxs("div", { className: css.question, children: [_jsx("p", { className: css.questionTitle, children: q.title }), q.type === 'TEXT' && (_jsx("input", { className: css.input, onChange: (e) => handleChange(q.id, e.target.value) })), q.type === 'DATE' && (_jsx("input", { type: "date", className: css.input, onChange: (e) => handleChange(q.id, e.target.value) })), (q.type === 'CHECKBOX' || q.type === 'MULTIPLE_CHOICE') && (_jsx("div", { className: css.options, children: q.options?.map((opt) => (_jsxs("label", { className: css.optionLabel, children: [_jsx("input", { type: q.type === 'CHECKBOX' ? 'checkbox' : 'radio', name: q.id, value: opt, onChange: () => handleChange(q.id, opt, true) }), opt] }, opt))) }))] }, q.id))), _jsx("div", { className: css.actions, children: _jsx(Button, { variant: "primary", text: "Submit", onClick: handleSubmit }) }), isLoading && _jsx(Loader, {}), validationError && (_jsx("div", { className: css.error, children: _jsx(ErrorMessage, { text: validationError }) })), isError && (_jsx("div", { className: css.error, children: _jsx(ErrorMessage, { text: "Failed to submit response" }) }))] }));
}
