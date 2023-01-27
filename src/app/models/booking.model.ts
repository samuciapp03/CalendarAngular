export interface Booking {
  id: number,
  date: Date,
  from: string,
  to: string,
  resource: {
    id: string,
    name: string,
    type: string
  },
  free: boolean,
  bookingId: string,
  bookingName: string,
  bookingDate: Date,
}
