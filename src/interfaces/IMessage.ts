import type IUser from '../interfaces/IUser.ts'
export default interface IMessage {
  id: number
  body: string
  receive: IUser
  send: IUser
}
