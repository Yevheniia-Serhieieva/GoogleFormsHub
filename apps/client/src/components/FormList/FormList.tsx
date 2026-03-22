import type { Form } from '@shared/types';
import css from './FormList.module.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

interface FormListProps {
  forms: Form[];
}

export default function FormList({ forms }: FormListProps) {
  const navigate = useNavigate();

  return (
    <>
      <ul className={css.list}>
        {forms.map((form) => (
          <li key={form.id} className={css.item}>
            <h2 className={css.title}>{form.title}</h2>
            {form.description && (
              <p className={css.description}>{form.description}</p>
            )}

            <div className={css.wrap}>
              <Button
                variant="secondary"
                text="View responses"
                onClick={() => navigate(`/forms/${form.id}/responses`)}
              />
              <Button
                text="Fill form"
                onClick={() => navigate(`/forms/${form.id}/fill`)}
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
