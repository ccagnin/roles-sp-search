class PlacesController < ApplicationController
  # skip_before_action :verify_authenticity_token, only: [:create, :update, :destroy]
  include CurrentUserConcern

  def index
    @places = Place.all
    render json: @places
  end

  def show
    @place = Place.find(params[:id])
    render json: @place
  end

  def create
    @place = @current_user.places.build(place_params)
    if @place.save
      render json: { status: 'created', place: @place }
    else
      render json: @places.errors, status: :unprocessable_entity
    end
  end

  def update
    @place = Place.find(params[:id])
    if @place.update(place_params)
      render json: @place
    else
      render json: @place.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @place = Place.find(params[:id])
    @place.destroy
    head :no_content
  end

  def user_places
    @places = @current_user.places
    render json: @places
  end

  def favorite
    @place = Place.find(params[:place_id])
    if @place.favorited_by?(@current_user)
      @current_user.favorites.find_by(place_id: @place.id).destroy
    else
      @current_user.favorites.create(place_id: @place.id)
    end
    redirect_to @place
  end

  def unfavorite
    @place = Place.find_by(id: params[:id])
    if @place
      @place.favorited_by.delete(@current_user.id)
      @place.save
      render json: { favorited: false }
    else
      render json: @place.errors, status: :unprocessable_entity
    end
  end

  private

  def place_params
    params.require(:place).permit(:name, :place_type, :description, :location, :neighborhood)
  end
end
