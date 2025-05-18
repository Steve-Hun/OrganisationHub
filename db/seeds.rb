# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


org1 = Organisation.create!(name: "Coles")
org2 = Organisation.create!(name: "Woolworths")
org3 = Organisation.create!(name: "Aldi")


user1 = User.create!(email_address: "john@example.com", password: "password")
user2 = User.create!(email_address: "bob@example.com", password: "password")
user3 = User.create!(email_address: "jane@example.com", password: "password")


Membership.create!(user: user1, organisation: org1, status: "active")
Membership.create!(user: user2, organisation: org1, status: "active")

Membership.create!(user: user2, organisation: org2, status: "active")
