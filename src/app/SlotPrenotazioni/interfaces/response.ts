import { Data } from "./data";

export interface RestResponse<T>{
    status: string,
    code: number,
    message: string,
    data: Data<T>

}