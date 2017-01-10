Rails.application.routes.draw do
  root to: 'pages#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'calendar', to: 'availabilities#new'
  post 'calendar', to: 'availabilities#create'
  get 'availabilities', to: 'availabilities#index'
end
