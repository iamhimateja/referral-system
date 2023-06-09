class Api::BaseController < ActionController::API
  before_action :authenticate_user!

  private
  def authenticate_user!
    # byebug
    token = request.headers['Authorization']&.split&.last
    decoded_token = JwtService.decode(token)

    if decoded_token.present? && User.exists?(decoded_token[:user_id])
      @current_user = User.find(decoded_token[:user_id])
    else
      render json: { error: 'Invalid token' }, status: :unauthorized
    end
  end
end
