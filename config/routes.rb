Rails.application.routes.draw do
  root 'places#index'
  resources :places, only: [:index, :show, :create]
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"
end
