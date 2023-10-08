import { User as FirebaseUser } from 'firebase/auth'

class User {
  private _user: FirebaseUser | null

  private _token: string

  set user(user) {
    this._user = user

    localStorage.setItem('user', JSON.stringify(user))
  }

  get user() {
    return this._user
  }

  set token(token: string) {
    this._token = token

    localStorage.setItem('token', token)
  }

  get token() {
    return this._token
  }

  constructor() {
    const storeUser = localStorage.getItem('user')
    const storeToken = localStorage.getItem('token')

    this._user = storeUser ? JSON.parse(storeUser) : null
    this._token = storeToken ? storeToken : ''
  }

  clear() {
    this._user = null
    this._token = ''
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }
}

const user = new User()

export default user
export { User }
