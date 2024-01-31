import type { FC} from "react";
import { Fragment, isValidElement, type ReactNode } from "react"

interface ListViewProps<T> {
    data: T[] | undefined
    error?: boolean
    loading?: boolean
    renderRow: FC<T>
    ListEmptyComponent: ReactNode
    LoadingComponent?: ReactNode
    ErrorComponent?: ReactNode
    listClasses?: string
}

const getEmptyContainer = (ListEmptyComponent: ReactNode) => {
    if (ListEmptyComponent)
        return isValidElement(ListEmptyComponent) ? (
            <> {ListEmptyComponent}</>
        ) : (
            <></>
        )
}

const getLoadingContainer = (LoadingComponent: ReactNode) => {
    if (LoadingComponent)
        return isValidElement(LoadingComponent) ? (
            <> {LoadingComponent}</>
        ) : (
            <></>
        )
}

const getErrorContainer = (ErrorComponent: ReactNode) => {
    if (ErrorComponent)
        return isValidElement(ErrorComponent) ? <> {ErrorComponent}</> : <></>
}

const ListView = <T extends { id: string }>({
    data,
    loading,
    renderRow,
    LoadingComponent,
    ListEmptyComponent,
    ErrorComponent,
    error,
    listClasses,
}: ListViewProps<T>) => {
    return loading ? (
        getLoadingContainer(LoadingComponent)
    ) : error ? (
        getErrorContainer(ErrorComponent)
    ) : data && data?.length > 0 ? (
        <div className={listClasses}>
            {data?.map(item => (
                <Fragment key={item.id}>{renderRow(item)}</Fragment>
            ))}
        </div>
    ) : (
        getEmptyContainer(ListEmptyComponent)
    )
}

export default ListView
