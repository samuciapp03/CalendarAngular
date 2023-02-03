import { Resource } from "./resource";
import { Status } from "./status";


export interface SlotPrenotazioni {
    id: number,
    startDate: Date,
    endDate: Date,
    status: Status,
    resource: Resource
}
