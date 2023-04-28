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

  private

  def place_params
    params.require(:place).permit(:name, :place_type, :description, :location, :neighborhood)
  end
end
