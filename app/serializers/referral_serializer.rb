class ReferralSerializer < ActiveModel::Serializer
  attributes :email, :token, :claimed, :created_at
  attribute :claimed_user, if: :claimed?

  def claimed_user
    object.referred_user&.name
  end

  def claimed?
    object.claimed?
  end
end
