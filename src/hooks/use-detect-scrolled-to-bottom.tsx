import { useCallback, useEffect, useState } from "react"

const useDetectScrolledToBottom = () => {
    const [isBottom, setIsBottom] = useState(false)

    const handleScroll = useCallback(() => {
        const threshold = 300

        const isReachBottom =
            window.innerHeight +
                document.documentElement.scrollTop +
                threshold >=
            document.documentElement.offsetHeight

        if (isReachBottom) {
            setIsBottom(true)
        } else {
            setIsBottom(false)
        }
    }, [])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [handleScroll])

    return { isBottom }
}

export default useDetectScrolledToBottom
