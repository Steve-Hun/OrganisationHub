class User < ApplicationRecord
  has_secure_password
  has_many :sessions, dependent: :destroy
  has_many :posts
  belongs_to :organisation, optional: true

  normalizes :email_address, with: ->(e) { e.strip.downcase }

  # Validation when user try to update their profile
  validates :name, presence: true
  validates :email_address, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, presence: true, if: :password_digest_changed?
end
