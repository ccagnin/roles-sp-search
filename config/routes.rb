Rails.application.routes.draw do
  root 'places#index'
  resources :places, only: [:index, :show, :create, :update, :destroy]
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
  get '/my-places', to: 'places#user_places'
  resources :places do
    post 'favorite', to: 'places#favorite'
  end
end
