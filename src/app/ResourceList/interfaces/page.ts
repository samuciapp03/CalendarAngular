export interface Page<T>{
    content: Array<T>,
    pageSize: number,
    totalElements: number,
    totalPages: number
}