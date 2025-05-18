class CreateMemberships < ActiveRecord::Migration[8.0]
  def change
    create_table :memberships do |t|
      t.references :user, null: false, foreign_key: true
      t.references :organisation, null: false, foreign_key: true
      t.string :status

      t.timestamps
    end

    # Unique index to ensure a user joins an organisation once
    add_index :memberships, [:user_id, :organisation_id], unique: true
  end
end
