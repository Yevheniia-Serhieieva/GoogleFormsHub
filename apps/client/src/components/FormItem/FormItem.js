import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Field, Form as FormikForm, Formik, FieldArray, } from 'formik';
import * as Yup from 'yup';
import Button from '../Button/Button';
import css from './FormItem.module.css';
import { useCreateFormMutation } from '../../api/api';
import { ErrorMessage as FormikError } from 'formik';
import SuccessMessage from '../SuccessMessage/SuccessMessage';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useNavigate } from 'react-router-dom';
const validationSchema = Yup.object().shape({
    title: Yup.string()
        .trim()
        .min(3, 'Title too short')
        .max(50, 'Title too long')
        .required('Title is required'),
    description: Yup.string().max(500, 'Description is too long'),
    questions: Yup.array().of(Yup.object({
        title: Yup.string().required('Question title required'),
        type: Yup.string().required(),
        options: Yup.array().when('type', {
            is: (type) => type === 'MULTIPLE_CHOICE' || type === 'CHECKBOX',
            then: (schema) => schema.min(1, 'At least one option is required'),
            otherwise: (schema) => schema.notRequired(),
        }),
    })),
});
export default function FormItem() {
    const initialValues = {
        title: '',
        description: '',
        questions: [],
    };
    const navigate = useNavigate();
    const [createForm, { isLoading, isError, isSuccess }] = useCreateFormMutation();
    const handleSubmit = async (values, actions) => {
        try {
            await createForm({
                title: values.title,
                description: values.description,
                questions: values.questions.map((q) => ({
                    title: q.title,
                    type: q.type,
                    options: q.type === 'MULTIPLE_CHOICE' || q.type === 'CHECKBOX'
                        ? q.options
                        : [],
                })),
            }).unwrap();
            actions.resetForm();
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
        catch (error) {
            console.error('Error creating form', error);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Formik, { initialValues: initialValues, validationSchema: validationSchema, onSubmit: handleSubmit, children: ({ values }) => (_jsxs(FormikForm, { className: css.form, children: [_jsx(Field, { name: "title", placeholder: "Form title", className: css.field }), _jsx(FormikError, { name: "title", component: "p", className: css.error }), _jsx(Field, { name: "description", placeholder: "Description", className: css.field }), _jsx(FormikError, { name: "description", component: "p", className: css.error }), _jsx(FieldArray, { name: "questions", children: ({ push, remove }) => (_jsxs("div", { children: [values.questions.map((q, index) => (_jsxs("div", { className: css.question, children: [_jsx(Field, { name: `questions.${index}.title`, placeholder: "Question title" }), _jsx(FormikError, { name: `questions.${index}.title`, component: "p", className: css.error }), _jsxs(Field, { as: "select", name: `questions.${index}.type`, children: [_jsx("option", { value: "TEXT", children: "Text" }), _jsx("option", { value: "MULTIPLE_CHOICE", children: "Multiple choice" }), _jsx("option", { value: "CHECKBOX", children: "Checkbox" }), _jsx("option", { value: "DATE", children: "Date" })] }), _jsx(FormikError, { name: `questions.${index}.options`, component: "p", className: css.error }), (q.type === 'MULTIPLE_CHOICE' ||
                                                q.type === 'CHECKBOX') && (_jsx(FieldArray, { name: `questions.${index}.options`, children: ({ push: pushOption, remove: removeOption }) => (_jsxs("div", { children: [q.options.map((_, optIndex) => (_jsxs("div", { className: css.optionWrap, children: [_jsx(Field, { name: `questions.${index}.options.${optIndex}`, placeholder: "Option" }), _jsx(Button, { type: "button", text: "-", onClick: () => removeOption(optIndex) })] }, optIndex))), _jsx(Button, { type: "button", text: "Add option", onClick: () => pushOption('') })] })) })), _jsx("div", { children: _jsx(Button, { type: "button", text: "Remove question", onClick: () => remove(index) }) })] }, index))), _jsx(Button, { type: "button", variant: "tertiary", text: "Add question", onClick: () => push({
                                            title: '',
                                            type: 'TEXT',
                                            options: [],
                                        }) })] })) }), _jsx("div", { children: _jsx(Button, { type: "submit", variant: "primary", text: isLoading ? 'Creating...' : 'Create form', disabled: isLoading }) })] })) }), _jsx("div", { className: css.wrap, children: _jsx(Button, { variant: "tertiary", text: "Home page", onClick: () => navigate(`/`) }) }), isError && _jsx(ErrorMessage, { text: "Failed to create form" }), isSuccess && _jsx(SuccessMessage, {})] }));
}
