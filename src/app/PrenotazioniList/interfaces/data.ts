import { Page } from "./page";
import { Resource } from "./resource";

export interface Data<T>{
    slots?: Array<T>
    slot?: T
    resource?: T
    resources?: Array<T>
    content: Array<T>,
    pageSize: number,
    totalElements: number,
    totalPages: number
    
    
}