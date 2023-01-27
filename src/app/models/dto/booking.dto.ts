export interface BookingDto {
  slot: {
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
  },
  booking: {
    bookingId: string,
    bookingName: string,
    bookingDate: Date,
  }
}
