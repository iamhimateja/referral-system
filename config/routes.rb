Rails.application.routes.draw do
  root "main#index"

  namespace :api, defaults: { format: :json } do
    get 'me', to: 'referrals#me'

    get 'referrals', to: 'referrals#index'
    get 'referrals/:token', to: 'referrals#fetch'
    post 'referrals', to: 'referrals#create'
    post 'referrals/:token/resend', to: 'referrals#resend_invite'

    devise_for :users, skip: [:sessions, :registrations]

    devise_scope :user do
      post 'login', to: 'sessions#create', as: :user_session
      delete 'logout', to: 'sessions#destroy'
      post 'register', to: 'registrations#create', as: :user_registration
    end
  end

  get '*path', to: 'main#index', via: :all
end
