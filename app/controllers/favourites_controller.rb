class FavouritesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_place

  def create
    current_user.favourites.create(place: @place)
    render json: { favourited: true }
  end

  def destroy
    current_user.favourites.find_by(place: @place)&.destroy
    render json: { favourited: false }
  end

  private

  def set_place
    @place = Place.find(params[:place_id])
  end
end
