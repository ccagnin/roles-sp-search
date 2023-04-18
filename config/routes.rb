Rails.application.routes.draw do
  root 'places#index'
  resources :places, only: [:index, :show, :create]
  resources :sessions, only: [:create]
end

