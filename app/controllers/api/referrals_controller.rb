class Api::ReferralsController < Api::BaseController
  before_action :authenticate_user!, except: [:fetch]

  def me
    render json: { email: @current_user.email, name: @current_user.name }
  end

  def fetch
    # This is a public endpoint that can be used to fetch a referral by token while registering
    referral = Referral.find_by(token: params[:token])
    if !referral
      render json: { error: "This referral does not exist" }, status: :unprocessable_entity
    elsif referral.claimed
      render json: { error: "This referral has already been claimed" }, status: :unprocessable_entity
    else
      render json: { email: referral.email }
    end
  end

  def create
    referral = @current_user.referrals.create(email: params[:email])
    if referral.save
      render json: referral, serializer: ReferralSerializer, status: :created
    else
      render json: { error: referral.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  def resend_invite
    referral = @current_user.referrals.find_by(token: params[:token])
    if !referral
      render json: { error: "This referral does not exist" }, status: :unprocessable_entity
    elsif referral.claimed
      render json: { error: "This referral has already been claimed" }, status: :unprocessable_entity
    else
      referral.send_referral_invite
      render json: { message: "Referral invite sent successfully" }, status: :ok
    end
  end

  def index
    referrals = @current_user.referrals.includes(:referred_user).order(created_at: :desc)
    render json: referrals, each_serializer: ReferralSerializer
  end
end
