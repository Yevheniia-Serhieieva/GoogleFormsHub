import { useNavigate, useParams } from 'react-router-dom';
import { useGetFormQuery, useGetResponsesQuery } from '../../../api/api';
import Loader from '../../Loader/Loader';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import css from './FormResponsesPage.module.css';
import Button from '../../Button/Button';

export default function FormResponsesPage() {
  const { id } = useParams();
  const { data: responses, isLoading, isError } = useGetResponsesQuery(id!);
  const { data: form } = useGetFormQuery(id!);
  const navigate = useNavigate();

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage text="Failed to load responses" />;
  if (!responses || !form) return null;

  return (
    <div className={css.container}>
      <h1 className={css.title}>Responses</h1>

      {responses.map((r, index) => (
        <div key={r.id} className={css.card}>
          <h2 className={css.responseTitle}>Response #{index + 1}</h2>

          {r.answers.map((a: { questionId: string; value: string }) => {
            const question = form.questions.find((q) => q.id === a.questionId);

            return (
              <div key={a.questionId} className={css.row}>
                <p className={css.question}>
                  {question?.title || 'Unknown question'}
                </p>
                <p className={css.answer}>{a.value}</p>
              </div>
            );
          })}
        </div>
      ))}

      <div>
        <Button
          variant="primary"
          text="Home page"
          onClick={() => navigate(`/`)}
        ></Button>
      </div>
    </div>
  );
}
