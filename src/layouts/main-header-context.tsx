import type {
    ReactNode,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
} from "react"
import { createContext, useContext, useState } from "react"

export type MainHeaderType = {
    component: ReactNode | undefined
    setComponent: Dispatch<SetStateAction<ReactNode | undefined>>
}

export const MainHeaderContext = createContext<MainHeaderType | null>(null)

export const MainHeaderProvider = ({ children }: PropsWithChildren) => {
    const [component, setComponent] = useState<ReactNode>()

    return (
        <MainHeaderContext.Provider value={{ component, setComponent }}>
            {children}
        </MainHeaderContext.Provider>
    )
}

export const useMainHeader = () => useContext(MainHeaderContext)
