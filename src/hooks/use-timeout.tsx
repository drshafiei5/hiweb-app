import React from "react"

const useTimeout = (callback: () => void, delay: number | null) => {
    const timeoutRef = React.useRef<number>(0)
    const callbackRef = React.useRef(callback)

    React.useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    React.useLayoutEffect(() => {
        if (typeof delay === "number" && timeoutRef) {
            timeoutRef.current = window.setTimeout(
                () => callbackRef.current(),
                delay,
            )

            return () => window.clearTimeout(timeoutRef.current)
        }
    }, [delay])

    return timeoutRef
}


export default useTimeout;