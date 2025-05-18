class AddOrganisationToPosts < ActiveRecord::Migration[8.0]
  def change
    add_reference :posts, :organisation, null: false, foreign_key: true
  end
end
