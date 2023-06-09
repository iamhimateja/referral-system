class ReferralMailer < ApplicationMailer
  def referral_invite(referral)
    referral = referral
    referrer = referral.referrer

    @invite_url = "http://localhost:3000/register?token=#{referral.token}"
    @referrar_name = referrer.name
    mail(from: referrer.email, to: referral.email, subject: "You have been invited to join this site")
  end
end