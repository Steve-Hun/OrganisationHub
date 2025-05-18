Rails.application.routes.draw do
  resource :session do
    get :signin, to: "sessions#new"
  end

  resource :registration do
    get "/", to: "registrations#new"
  end

  resources :users, only: %i[ edit update show ]

  resources :organisations, only: %i[ show edit index ] do 
    resources :posts
  end
  
  resources :passwords, param: :token
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  root to: redirect("/session/signin")

  
end
