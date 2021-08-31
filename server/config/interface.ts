export interface INewUser {
  name: string
  account: string
  password:string
}

export interface IToken {
  newUser: INewUser
  iat:number
  exp: number
}