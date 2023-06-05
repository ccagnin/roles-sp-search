class Place < ApplicationRecord
  belongs_to :user

  validates :name, :place_type, :description, :location, :neighborhood, presence: true
  validates :name, length: { minimum: 3 }

  has_many :favorites
  has_many :favorited_by, through: :favorites, source: :user

  def favorited_by?(user)
    favorited_by.include?(user)
  end
end
