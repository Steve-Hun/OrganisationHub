Rails.application.routes.draw do

  # Routes handled by Rails
  resource :session do
    get :signin, to: "sessions#new"
  end

  resource :registration do
    get "/", to: "registrations#new"
  end
  
  resources :passwords, param: :token
  resources :organisations, only: %i[ show edit index ]
  resources :users, only: %i[ edit update show ]

  # API routes for React frontend
  namespace :api do
    resources :organisations, only: [] do
      resources :posts
    end
  end
  
  # Routes handles by React
  get "organisations/:organisation_id/posts", to: "react#index"
  get "organisations/:organisation_id/posts/:id", to: "react#index"
  get "organisations/:organisation_id/posts/new", to: "react#index"
  get "organisations/:organisation_id/posts/:id/edit", to: "react#index"

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Root path ("/")
  root to: redirect("/session/signin")  
end
