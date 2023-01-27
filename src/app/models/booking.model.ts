import {Resource} from "./resource.model";

export interface Booking {
  slotId: number,
  slotDate: Date,
  slotStartTime: string,
  slotEndTime: string,
  resource: Resource

}
