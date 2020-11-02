export interface IUser {
  email: string
  password: string
  returnSecureToken?: boolean
}

export interface IFireBaseAuth {
  idToken: string
  expiresIn: string
}
