Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  resources :events, only: [:index, :show, :new, :edit, :delete]

  namespace :api do
    namespace :v1 do
      resources :events
      resources :users
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
