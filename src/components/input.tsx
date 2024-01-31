import { cva, type VariantProps } from "class-variance-authority"
import Label from "./label"
import type {
    FieldErrors,
    FieldValues,
    Path,
    RegisterOptions,
    UseFormRegister,
} from "react-hook-form"
import type { ReactNode } from "react"

const input = cva(
    ["block", "w-full", "border", "focus:outline-none", "focus:ring-1"],
    {
        variants: {
            intent: {
                primary: [
                    "border-gray-300",
                    "focus:ring-gray-400",
                    "focus:border-transparent",
                ],
            },
            sizeMode: {
                sm: ["text-sm", "rounded-lg", "p-2"],
                lg: ["text-lg", "rounded-xl", "p-2"],
            },
        },
        defaultVariants: {
            intent: "primary",
            sizeMode: "sm",
        },
    },
)

export interface InputProps<T extends FieldValues>
    extends React.InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof input> {
    name: Path<T>
    label: string
    errors: FieldErrors<T>
    register: UseFormRegister<T>
    registerOptions?: RegisterOptions<T, Path<T>>
}

const Input = <T extends FieldValues>({
    label,
    placeholder,
    name,
    intent,
    sizeMode,
    className,
    register,
    registerOptions,
    errors,
    ...props
}: InputProps<T>) => {
    return (
        <div className="mt-5">
            <Label
                htmlFor={name}
                text={label}
                size={sizeMode}
                intent={intent}
            />
            <input
                id={name}
                type="text"
                placeholder={placeholder}
                className={input({ intent, sizeMode, className })}
                {...register(name, registerOptions)}
                {...props}
            />
            {errors && errors[name]?.type && (
                <span className="text-red-500 mt-1 block text-sm text-right">
                    {errors[name]?.message as ReactNode}
                </span>
            )}
        </div>
    )
}

export default Input
