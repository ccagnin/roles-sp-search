class UsersController < ApplicationController
  include CurrentUserConcern

  def favorites
    puts "@current_user: #{@current_user.inspect}"
    @favorites = @current_user.favorites.map(&:place)
    puts "@favorites: #{@favorites.inspect}" 
    render json: @favorites
  end
end
