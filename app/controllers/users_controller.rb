class UsersController < ApplicationController
  include CurrentUserConcern

  def favorites
    puts "@current_user: #{@current_user.inspect}" # adicione essa linha
    @favorites = @current_user.favorites.map(&:place)
    puts "@favorites: #{@favorites.inspect}" # adicione essa linha
    render json: @favorites
  end
end
