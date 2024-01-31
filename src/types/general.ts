export interface ApiResponse<T> {
    data: T
    error: string
    hasError: boolean
}

export interface ApiError {
    type: string
    title: string
    status: number
    traceId: string
    errors: Errors
}

interface Errors {
    [key: string]: string[]
}
