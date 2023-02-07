Rails.application.routes.draw do
  resources :bills
  resources :assignments
  resources :jobs
  resources :plumbers
  resources :clients
  resources :users
end
