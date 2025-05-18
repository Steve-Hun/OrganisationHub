class Organisation < ApplicationRecord
  
  has_many :memberships
  has_many :users, through: :memberships
  has_many :posts

  def active_users(organisation)
    users.where(status: "active")
  end
  
end
