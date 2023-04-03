class CreatePlaces < ActiveRecord::Migration[7.0]
  def change
    create_table :places do |t|
      t.string :name
      t.string :type
      t.string :description
      t.string :location
      t.string :neighborhood
      t.string :comments

      t.timestamps
    end
  end
end
