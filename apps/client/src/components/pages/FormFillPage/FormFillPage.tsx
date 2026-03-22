import { useNavigate, useParams } from 'react-router-dom';
import { useGetFormQuery, useSubmitResponseMutation } from '../../../api/api';
import Button from '../../Button/Button';
import Loader from '../../Loader/Loader';
import { useState } from 'react';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import css from './FormFillPage.module.css';

export default function FormFillPage() {
  const { id } = useParams();
  const { data: form, isLoading } = useGetFormQuery(id!);
  const [submitResponse, { isError }] = useSubmitResponseMutation();
  const [validationError, setValidationError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!form || !id) return;

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

  const handleChange = (
    questionId: string,
    value: string,
    isCheckbox?: boolean,
  ) => {
    setValidationError(null);
    setAnswers((prev) => {
      if (isCheckbox) {
        const current = (prev[questionId] as string[]) || [];

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

  if (!form) return <Loader />;

  return (
    <div className={css.container}>
      <h1 className={css.title}>{form.title}</h1>

      {form.questions.map((q) => (
        <div key={q.id} className={css.question}>
          <p className={css.questionTitle}>{q.title}</p>

          {q.type === 'TEXT' && (
            <input
              className={css.input}
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}
          {q.type === 'DATE' && (
            <input
              type="date"
              className={css.input}
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}

          {(q.type === 'CHECKBOX' || q.type === 'MULTIPLE_CHOICE') && (
            <div className={css.options}>
              {q.options?.map((opt) => (
                <label key={opt} className={css.optionLabel}>
                  <input
                    type={q.type === 'CHECKBOX' ? 'checkbox' : 'radio'}
                    name={q.id}
                    value={opt}
                    onChange={() => handleChange(q.id, opt, true)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
      <div className={css.actions}>
        <Button variant="primary" text="Submit" onClick={handleSubmit}></Button>
      </div>

      {isLoading && <Loader />}

      {validationError && (
        <div className={css.error}>
          <ErrorMessage text={validationError} />
        </div>
      )}

      {isError && (
        <div className={css.error}>
          <ErrorMessage text="Failed to submit response" />
        </div>
      )}
    </div>
  );
}
