class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy, :like, :unlike]

  # GET /posts
  # GET /posts.json
  def index
    @posts = Post.all
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
    @comments = @post.comments.last(10)
    array = @post.user.posts.order('created_at desc').ids
    @next_post = array.select { |a| a > @post.id}.last
    @prev_post = array.select { |a| a < @post.id}.first
    gon.following = current_user.following_users.pluck(:profile_name)
  end

  # GET /posts/new
  def new
    @post = Post.new
  end

  # GET /posts/1/edit
  def edit
  end
  
  def like
    current_user.likes(@post)
  end
  
  def unlike
    current_user.unlike(@post)
  end
  # POST /posts
  # POST /posts.json
  
  def follow_show
    @user = User.find_by_profile_name(params[:profile_name])
    current_user.follow(@user)
  end
    
  def stop_following_show
    @user = User.find_by_profile_name(params[:profile_name])
    current_user.stop_following(@user)
  end
  
  def create
    @post = current_user.posts.new(post_params)
    respond_to :js
  end

  # PATCH/PUT /posts/1
  # PATCH/PUT /posts/1.json
  def update
    respond_to do |format|
      if @post.update(post_params)
        format.html { redirect_to @post, notice: 'Post was successfully updated.' }
        format.json { render :show, status: :ok, location: @post }
      else
        format.html { render :edit }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    @post.destroy
    respond_to do |format|
      format.html { redirect_to posts_url, notice: 'Post was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
      params.require(:post).permit(:title, :image)
    end
end
