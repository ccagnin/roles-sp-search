class AddUserIdToPlaces < ActiveRecord::Migration[7.0]
  def change
    add_column :places, :user_id, :integer
    add_index :places, :user_id
  end
end
