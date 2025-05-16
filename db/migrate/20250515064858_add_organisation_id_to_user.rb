class AddOrganisationIdToUser < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :organisation_id, :integer
  end
end
