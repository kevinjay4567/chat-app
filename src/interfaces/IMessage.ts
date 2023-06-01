import type IUser from '../interfaces/IUser.ts'
export default interface IMessage {
  id: number
  body: string
  user_receive: IUser
  user_id: IUser
}
