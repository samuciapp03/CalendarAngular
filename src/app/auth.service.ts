import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, first, firstValueFrom, Observable } from 'rxjs'
import { ChangePasswordRequest } from './requests/change-password.request'
import { LoginRequest } from './requests/login.request'
import { RegisterRequest } from './requests/register.request'
import { User } from './models/user.model'
import { Token } from './models/token.model'
import { SuccessResponse } from './response/success.response'
import { UpdateProfileRequest } from './requests/update-profile.request'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly BASE_URL = 'http://localhost:8080/api/auth/'
  private pToken: string | null
  decodedToken: Token | null = null

  get user(): User | null {
    this.checkTokenExpired()
    return this.decodedToken?.user ?? null
  }

  get isLoggedIn() {
    return this.token !== null
  }

  get isAdmin() {
    return this.user?.roles.includes('ROLE_ADMIN') ?? false
  }

  set token(value: string | null) {
    if (value === null) {
      localStorage.removeItem('jwtToken')
      this.decodedToken = null
    } else {
      localStorage.setItem('jwtToken', value)
      this.decodedToken = this.decodeToken(value)
      console.log('decoded token', this.decodedToken)
    }
    this.pToken = value
  }

  get token() {
    this.checkTokenExpired()
    return this.pToken
  }

  constructor(private http: HttpClient) {
    this.pToken = localStorage.getItem('jwtToken')
    if (this.pToken) {
      this.decodedToken = this.decodeToken(this.pToken)
      console.log('decoded token', this.decodedToken)
    }
  }

  async passwordForgotten(email: string): Promise<SuccessResponse> {
    return await firstValueFrom(this.http.post(this.BASE_URL + 'password-forgotten', { email })) as SuccessResponse
  }

  async login(lr: LoginRequest): Promise<void> {
    const obj: any = await firstValueFrom(this.http.post(this.BASE_URL + 'login', lr))
    this.token = obj.token
  }

  async registerHttp(rr: RegisterRequest): Promise<SuccessResponse> {
    return await firstValueFrom(this.http.post(this.BASE_URL + 'register', rr)) as SuccessResponse
  }

  async changePassword(cr: ChangePasswordRequest): Promise<SuccessResponse> {
    return await firstValueFrom(this.http.post(this.BASE_URL + 'change-password', cr)) as SuccessResponse
  }

  logout() {
    this.token = null

  }

  async activateUser(param: { token: string }) {
    return await firstValueFrom(this.http.post(this.BASE_URL + 'activate-user', param)) as SuccessResponse
  }

  private checkTokenExpired() {
    if (this.decodedToken !== null && this.decodedToken.exp.getTime() < new Date().getTime()) {
      this.logout()
    }
  }

  private decodeToken(value: string): Token {
    const parts = value.split('.')
    const json = atob(parts[1])
    const obj = JSON.parse(json)
    return {
      iss: obj.iss,
      aud: obj.aud,
      nbf: new Date((obj.nbf as number) * 1000),
      exp: new Date((obj.exp as number) * 1000),
      iat: new Date((obj.iat as number) * 1000),
      user: {
        id: parseInt(obj.sub),
        username: obj.username,
        email: obj.email,
        roles: obj.roles as string[],
        firstName: obj.firstname,
        lastName: obj.lastname,
      },
    }
  }

  async requestPasswordChange(): Promise<SuccessResponse> {
    return await firstValueFrom(this.http.post(this.BASE_URL + 'request-password-change', null)) as SuccessResponse
  }

  async updateProfile(req: UpdateProfileRequest) {
    const obj: any = await firstValueFrom(this.http.post(this.BASE_URL + 'profile', req))
    this.token = obj.token
  }
}
