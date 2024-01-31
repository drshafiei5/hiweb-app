import { useMainHeader } from "@/layouts/main-header-context"
import type { ReactNode, PropsWithChildren } from "react"
import { useEffect } from "react"

const MainHeaderWrapper = ({
    children,
    HeaderComponent
}: PropsWithChildren<{ HeaderComponent: ReactNode }>) => {
    const { setComponent } = useMainHeader() || {}

    useEffect(() => {
        if (setComponent) {
            setComponent(HeaderComponent)
        }
    }, [HeaderComponent, setComponent])

    return children
}

export default MainHeaderWrapper
