class Membership < ApplicationRecord
  belongs_to :user
  belongs_to :organisation

  def self.get_active_memberships(user)
    Membership.where(user: user, status: "active")
  end
end
