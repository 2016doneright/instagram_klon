class ProfilesController < ApplicationController
    def show
        @user = User.find_by_profile_name(params[:profile_name])
        @posts = @user.posts.all.order('created_at desc').paginate(:page => params[:page], :per_page => 12)
    end
    
    def guest
        random_user = User.find(rand(1..50))
        sign_in(:user, random_user)
        redirect_to root_path
    end
    
    def follow
        @user = User.find_by_profile_name(params[:profile_name])
        current_user.follow(@user)
    end
    
    def stop_following
        @user = User.find_by_profile_name(params[:profile_name])
        current_user.stop_following(@user)
    end
end
