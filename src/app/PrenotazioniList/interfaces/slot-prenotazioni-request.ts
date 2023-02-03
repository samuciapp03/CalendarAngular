import { Status } from "./status";

export interface SlotPrenotazioniRequest {
    startDate: Date,
    endDate: Date,
    status: Status,
    resourceId: number
}
