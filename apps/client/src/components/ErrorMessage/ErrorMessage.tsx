import css from './ErrorMessage.module.css';

interface Props {
  text?: string;
}

export default function ErrorMessage({ text }: Props) {
  return (
    <>
      <p className={css.error}>
        {text || 'There was an error, please try again...'}
      </p>
    </>
  );
}
