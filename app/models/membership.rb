class Membership < ApplicationRecord
  belongs_to :user
  belongs_to :organisation

  def self.get_active_memberships(user)
    Membership.where(user: user, status: "active")
  end

  def self.is_active_member?(user, organisation)
    Membership.where(user: user, organisation: organisation, status: "active").exists?
  end
end
