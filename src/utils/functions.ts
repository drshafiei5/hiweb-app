export const toBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject
    })

export const getUniqueListBy = <T>(arr: T[], key: keyof T) => {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}
