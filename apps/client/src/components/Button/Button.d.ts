interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'tertiary';
    text: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit';
}
export default function Button({ variant, text, onClick, disabled, type, }: ButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
