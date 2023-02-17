Rails.application.routes.draw do

  get "/auto_login", to: "users#show"
  post "/login", to: "sessions#login"
  delete "/logout", to: "sessions#logout"

  post "/create_account", to: "users#create"

  resources :bills
  resources :jobs
  resources :plumbers do
    resources :assignments
  end
  resources :clients do
    resources :jobs
  end
  resources :users
end
