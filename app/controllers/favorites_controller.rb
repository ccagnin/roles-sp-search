class FavoritesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_place

  def create
    current_user.favorites.create(place: @place)
    render json: { favorited: true }
  end

  def destroy
    current_user.favorites.find_by(place: @place)&.destroy
    render json: { favorited: false }
  end

  private

  def set_place
    @place = Place.find(params[:place_id])
  end
end
