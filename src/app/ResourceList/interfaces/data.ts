import { Page } from "./page";

export interface Data<T>{
    resources?: Array<T>
    resource?: T
    page?: Page<T>
}