export interface IUser {
    firstname: string;
    lastname: string;
    physicaladdress: string;
    billingaddress:string
    id?:string
  }

export interface UserState {
  userContact:IUser
  error:string[]
  msg: string
}

export interface Props {
  handleClose:()=>void
  user:UserState
  open:boolean
  btnAction:boolean
  handleUserInput:(e: React.ChangeEvent<HTMLInputElement>) => void
  handleAddContact:()=>void
  handleUpdateContact:() =>void

}