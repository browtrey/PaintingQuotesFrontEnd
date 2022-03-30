import { Room } from "./Room"

export interface Quotation{
  Id: number
  qDate: Date
  qName: String
  qAddress: String
  qEmail: String
  qNumofRooms: number
  qRoom: Room[]
}