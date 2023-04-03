Rails.application.routes.draw do
  root 'places#index'
  resources :places, only: [:index, :show, :create]
end

