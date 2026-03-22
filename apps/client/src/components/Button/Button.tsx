import clsx from 'clsx';
import css from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

export default function Button({
  variant,
  text,
  onClick,
  disabled,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      className={clsx(css.button, variant && css[variant])}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
