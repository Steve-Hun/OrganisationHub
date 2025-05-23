class Post < ApplicationRecord
  belongs_to :user
  belongs_to :organisation

  validates :user, presence: true
  validates :organisation, presence: true
  
  def author_currently_active(organisation_id)
    user.active_in_org?(organisation_id)
  end
end
