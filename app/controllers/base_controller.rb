class BaseController < ApplicationController
    
    def feed 
        @following = current_user.following_users.ids
        @posts = Post.where('user_id in (?)', @following).order('created_at desc').paginate(:page => params[:page], :per_page => 12)
    end
end


