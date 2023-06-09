class Referral < ApplicationRecord
  belongs_to :referrer, foreign_key: :referrer_id, class_name: "User"
  belongs_to :referred_user, foreign_key: :referred_user_id, class_name: "User", optional: true

  validates :email, presence: true
  validates_uniqueness_of :email, scope: :referrer_id, message: "You have already referred this email"
  validates :token, presence: true, uniqueness: true

  validate :check_if_email_is_already_registered, on: :create

  before_validation :generate_token, on: :create
  after_create :send_referral_invite

  def send_referral_invite
    ReferralMailer.referral_invite(self).deliver_later
  end

  private
  def generate_token
    self.token = SecureRandom.urlsafe_base64(10)
  end

  def check_if_email_is_already_registered
    if User.exists?(email: email)
      if self.referrer.email === self.email
        errors.add(:base, "You cannot refer yourself")
      else
        errors.add(:base, "There is a user with this email already")
      end
    end
  end
end
