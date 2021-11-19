Rails.application.routes.draw do


  root to: 'home#index'
  resources :users
  resources :posts, only: [:index, :create, :destroy]
  get "app", to: "user#index"
  post "signin", controller: :signin, action: :create

  # get "users", to: "users#index"

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # root 'home#index'
end
