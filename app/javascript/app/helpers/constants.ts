export const TOKEN_ACCESSOR = 'authToken'

export const API_ROUTES = {
  ME: '/api/me',
  REGISTER: '/api/register',
  LOGIN: '/api/login',
  REFERRALS: '/api/referrals',
  REFERRAL: (token: string) => `/api/referrals/${token}`,
  REFERRAL_RESEND: (token: string) => `/api/referrals/${token}/resend`,
}
