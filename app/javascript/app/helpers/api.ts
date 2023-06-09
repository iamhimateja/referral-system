import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import type { BasicResponse, ReferralData } from '../types'

import { redirectToHome } from '.'
import { API_ROUTES, TOKEN_ACCESSOR } from './constants'

class API {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3000',
    })

    this.api.interceptors.request.use(
      (config: InternalAxiosRequestConfig<any>) => {
        const token = localStorage.getItem(TOKEN_ACCESSOR)

        if (token) {
          ;(config.headers as any) = { ...config.headers, Authorization: `Bearer ${token}` }
        }

        return config
      },
      (error) => Promise.reject(error),
    )

    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      (error) => {
        if (error.request.responseURL.includes(API_ROUTES.LOGIN)) {
          return Promise.resolve(error.response)
        }

        // Handle the case where the user tries to access a protected route without a JWT token
        if (error.response.status === 401) {
          localStorage.removeItem(TOKEN_ACCESSOR)
          redirectToHome()
          throw new Error('Unauthorized. Please login')
        }

        return Promise.resolve(error.response)
      },
    )
  }

  async register(name: string, email: string, password: string, token?: string) {
    const response = await this.api.post(API_ROUTES.REGISTER, {
      name,
      email,
      password,
      ...(token && { referral_token: token }),
    })
    return response
  }

  async login({ email, password }: { email: string; password: string }) {
    const response = await this.api.post(API_ROUTES.LOGIN, { email, password })
    return response
  }

  async fetchMe() {
    const response = await this.api.get(API_ROUTES.ME)
    return response
  }

  async logout() {
    localStorage.removeItem(TOKEN_ACCESSOR)
    return true
  }

  async fetchAllReferrals() {
    const response = await this.api.get(API_ROUTES.REFERRALS)
    return response.data as ReferralData[]
  }

  async fetchReferral(token: string) {
    const response = await this.api.get(API_ROUTES.REFERRAL(token))
    return response.data as ReferralData
  }

  async createReferral(email: string) {
    const response = await this.api.post(API_ROUTES.REFERRALS, { email })
    return response
  }

  async resendReferral(token: string) {
    const response = await this.api.post(API_ROUTES.REFERRAL_RESEND(token))
    return response.data as BasicResponse
  }
}

export default API
