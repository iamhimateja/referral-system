class Api::RegistrationsController < Api::BaseController
  skip_before_action :authenticate_user!, only: [:create]

  def create
    user = User.new(sign_up_params)

    if user.save
      token = JwtService.encode({ user_id: user.id })
      render json: { user: user.as_json(only: [:name, :email]), token: token }, status: :created
    else
      render json: { error: user.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  private

  def sign_up_params
    params.permit(:name, :email, :password, :password_confirmation, :referral_token)
  end
end
