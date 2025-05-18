class User < ApplicationRecord
  has_secure_password
  has_many :sessions, dependent: :destroy

  has_many :memberships
  has_many :organisations, through: :memberships
  has_many :posts

  normalizes :email_address, with: ->(e) { e.strip.downcase }

  # Validation when user try to update their profile
  validates :email_address, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, presence: true, if: :password_digest_changed?

  def membership_in(organisation_id)
    memberships.find_by(organisation_id: organisation_id)
  end

  def active_in_org?(organisation_id)
    membership = membership_in(organisation_id)
    #TODO: Change hard-coded to enum
    membership&.status == "active"
  end
end
