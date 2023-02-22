Rails.application.routes.draw do

  get "/auto_login", to: "users#show"
  post "/login", to: "sessions#login"
  delete "/logout", to: "sessions#logout"

  post "/create_account", to: "users#create"

  get "/open_jobs", to: "jobs#open_jobs"

  get "/bills/:id/pay", to: "bills#pay"

  get "/plumbers", to: "users#plumbers"

  get "/jobs/:id/accept", to: "jobs#accept"
  get "/jobs/:id/start", to: "jobs#start"
  get "/jobs/:id/finish", to: "jobs#finish"
  get "/jobs/:id/add_slot", to: "jobs#add_slot"
  get "/jobs/:id/leave", to: "jobs#leave"

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
