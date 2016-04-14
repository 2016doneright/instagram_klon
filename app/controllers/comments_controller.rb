class CommentsController < ApplicationController
    
    def create
        @post = Post.find(params[:post_id])
        @comment = @post.comments.create(safe_params)
        @comment.update(user_id: current_user.id)
        respond_to :js
    end
    
    def destroy
        @comment = Comment.find(params[:id])
        @comment.destroy
        respond_to :js
    end
    
    private 
    
    def safe_params
       params.require(:comment).permit(:content, :post_id) 
    end
end
