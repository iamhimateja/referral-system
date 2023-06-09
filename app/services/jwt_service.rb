require 'jwt'
require 'dotenv/load'

class JwtService
  SECRET_KEY = ENV['DEVISE_JWT_SECRET_KEY']

  def self.encode(payload)
    payload['jti'] = SecureRandom.uuid
    JWT.encode(payload, SECRET_KEY, 'HS256')
  end

  def self.decode(token)
    decoded = JWT.decode(token, SECRET_KEY)[0]
    HashWithIndifferentAccess.new(decoded)
  rescue JWT::DecodeError, JWT::ExpiredSignature
    nil
  end
end
