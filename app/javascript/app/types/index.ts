export interface ReferralData {
  email: string
  token: string
  claimed: boolean
  created_at: string
  claimed_user: string
}

export interface BasicResponse {
  message?: string
  error?: string
}
