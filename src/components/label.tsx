import { cva, type VariantProps } from "class-variance-authority"

const label = cva(["block", "cursor-pointer", "text-right"], {
  variants: {
    intent: {
      primary: ["text-gray-400"],
    },
    size: {
      sm: ["text-sm", 'mb-1'],
      lg: ["text-sm"],
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "sm",
  },
})

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof label> {
  text: string
}

const Label: React.FC<LabelProps> = ({
  text,
  htmlFor,
  intent,
  size,
  className,
  ...props
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={label({ intent, size, className })}
      {...props}
    >
      {text}
    </label>
  )
}

export default Label
