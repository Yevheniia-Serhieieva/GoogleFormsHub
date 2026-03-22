import css from './SuccessMessage.module.css';

export default function SuccessMessage() {
  return (
    <>
      <p className={css.success}>Form created successfully!</p>
    </>
  );
}
