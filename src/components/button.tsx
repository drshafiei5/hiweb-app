import { cva, type VariantProps } from "class-variance-authority"

const button = cva(["w-full", "cursor-pointer"], {
    variants: {
        intent: {
            primary: ["bg-blue-600", "text-white", "hover:bg-blue-700"],
            success: ["bg-green-600", "text-white", "hover:bg-green-700"],
            error: ["bg-red-600", "text-white", "hover:bg-red-700"],
            clear: [],
        },
        size: {
            sm: ["text-sm", "py-2", "px-2", "rounded-lg"],
            lg: ["text-lg", "py-3.5", "px-2", "rounded-xl"],
        },
    },
    defaultVariants: {
        intent: "primary",
        size: "sm",
    },
})

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof button> {}

const Button: React.FC<ButtonProps> = ({
    className,
    intent,
    size,
    ...props
}) => <button className={button({ intent, size, className })} {...props} />

export default Button
