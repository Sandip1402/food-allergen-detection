import { ReactNode } from "react";

export type ButtonVariant =
    | "primary"
    | "secondary"
    | "danger"
    | "ghost";

export interface ButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
    variant?: ButtonVariant;
    leftIcon?: ReactNode;
}