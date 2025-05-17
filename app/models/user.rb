class User < ApplicationRecord
  has_secure_password
  has_many :sessions, dependent: :destroy
  has_many :posts
  belongs_to :organisation, optional: true

  normalizes :email_address, with: ->(e) { e.strip.downcase }
  validates :name, presence: true
end
