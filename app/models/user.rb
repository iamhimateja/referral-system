class User < ApplicationRecord
  attr_accessor :referral_token
  devise :database_authenticatable, :registerable, :validatable
  before_save :save_referrer
  after_save :add_user_to_referral

  has_many :referrals, foreign_key: :referrer_id, class_name: "Referral"
  belongs_to :referrer, class_name: "User", optional: true, foreign_key: :referrer_id
  has_one :joined_referral, class_name: "Referral", foreign_key: :referred_user_id

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 8 }

  private

  def save_referrer
    return unless referral_token.present?

    referral = Referral.find_by(token: referral_token)
    referrar = referral.referrer
    self.referrer = referrar

    referral.update!(claimed: true)
  end

  def add_user_to_referral
    return unless referral_token.present?
    referral = Referral.find_by(token: referral_token)
    referral.update!(referred_user_id: self.id)
  end
end
