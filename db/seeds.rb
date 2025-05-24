# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


org1 = Organisation.create!(name: "Macrodata")
org2 = Organisation.create!(name: "Apple")
org3 = Organisation.create!(name: "Google")


user1 = User.create!(email_address: "mark@gmail.com", password: "secret", name: "Mark")
user2 = User.create!(email_address: "dylan@gmail.com", password: "secret", name: "Dylan")
user3 = User.create!(email_address: "helly@gmail.com", password: "secret", name: "Helly")
user4 = User.create!(email_address: "irving@gmail.com", password: "secret", name: "Irving")
user5 = User.create!(email_address: "harmony@gmail.com", password: "secret", name: "Harmony")
user6 = User.create!(email_address: "milchick@gmail.com", password: "secret", name: "Milchick")

# Org 1
Membership.create!(user: user1, organisation: org1, status: "active")
Membership.create!(user: user2, organisation: org1, status: "active")
Membership.create!(user: user3, organisation: org1, status: "active")
Membership.create!(user: user4, organisation: org1, status: "active")
# Posts by user1
Post.create!(user: user1, organisation: org1, description: "What's for dinner?")
Post.create!(user: user1, organisation: org1, description: "I have enjoyed the benefits of my chosen field. And I will continue to enjoy them, for some time.")
Post.create!(user: user1, organisation: org1, description: "Every time you find yourself here, it's because you chose to come back.")

# Posts by user2
Post.create!(user: user2, organisation: org1, description: "I am a person. You are not.")
Post.create!(user: user2, organisation: org1, description: "I mean, it's not like we're children. We're… Not children.")
Post.create!(user: user2, organisation: org1, description: "So what are they refining, exactly? The numbers, what do they mean?")

# Posts by user3
Post.create!(user: user3, organisation: org1, description: "A department like ours has to be more than just efficient. It has to be a family.")
Post.create!(user: user3, organisation: org1, description: "The Music Dance Experience is a cherished and important tradition.")
Post.create!(user: user3, organisation: org1, description: "One of the most important parts of any Eagan's life is his breakfast.")

# Posts by user4
Post.create!(user: user4, organisation: org1, description: "Coveted AF.")
Post.create!(user: user4, organisation: org1, description: "The numbers are scary, okay? That's what makes them so important.")
Post.create!(user: user4, organisation: org1, description: "Okay, kids, let's get these numbers. For the good of the company.")


# Org 2
Membership.create!(user: user5, organisation: org2, status: "active")
Membership.create!(user: user6, organisation: org2, status: "active")

# Org 3
Membership.create!(user: user1, organisation: org3, status: "active")
Membership.create!(user: user5, organisation: org3, status: "active")
Membership.create!(user: user6, organisation: org3, status: "active")
