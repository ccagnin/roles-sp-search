class Place < ApplicationRecord
  belongs_to :user
  validates :name, :place_type, :description, :location, :neighborhood, presence: true
  validates :name, length: { minimum: 3 }
end
