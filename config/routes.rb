Rails.application.routes.draw do

  get "hashtags/:hashtag",   to: "hashtags#show",      as: :hashtag
  get "hashtags",            to: "hashtags#index",     as: :hashtags
  resources :comments
  devise_for :users
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'
  resources :posts do
    resources :comments, only: [:create, :destroy]
    member do
      put     :like,   to: "posts#like",   as: "like_this"
      delete  :unlike, to: "posts#unlike", as: "unlike_this"
    end
  end
  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'
  get '/:profile_name', to: 'profiles#show', as: 'gimme_profile'
  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase
  put :follow,              to: "profiles#follow",            as: "follow_person"
  put :stop_following,      to: "profiles#stop_following",    as: "unfollow_person"
  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products
  put :follow_show,              to: "posts#follow_show",            as: "follow_show_person"
  put :stop_following_show,      to: "posts#stop_following_show",    as: "unfollow_show_person"
  
  authenticated :user do
    root to: 'base#feed', as: :authenticated_root
  end
  
  root 'profiles#guest'
  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
