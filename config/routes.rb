Rails.application.routes.draw do

  resources :tasks
  root to: 'home#index'
  resources :users
  resources :tasks
  resources :posts
  get "app", to: "user#index"
  post "signin", controller: :signin, action: :create
  post "submit", controller: :submit, action: :create
  post "postimage", controller: :postimage, action: :create
  # get "users", to: "users#index"

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # root 'home#index'
end
