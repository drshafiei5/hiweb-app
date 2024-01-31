import tick from "@/assets/images/tick.png"
import close from "@/assets/images/close.png"
import { cva } from "class-variance-authority"

interface StatusProps {
    type: "error" | "success"
    message: string
}

const statusText = cva(["inline-block", "my-10"], {
    variants: {
        type: {
            error: ["text-red-600"],
            success: ["text-green-600"],
        },
    },
})

const Status: React.FC<StatusProps> = ({
    type,
    message,
    ...props
}) => {
    return (
        <div {...props}>
            <img
                alt="اعلام وضعیت"
                src={type === "success" ? tick : close}
                className="object-contain w-14 mx-auto"
            />
            <span className={statusText({ type })}>{message}</span>
        </div>
    )
}

export default Status
