class RenameTypeColumnInPlaces < ActiveRecord::Migration[6.1]
  def change
    rename_column :places, :type, :place_type
  end
end
