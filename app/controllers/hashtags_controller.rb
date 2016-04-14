class HashtagsController < ApplicationController

  def index
    @hashtags = SimpleHashtag::Hashtag.all
  end

  def show
    @hashtag = SimpleHashtag::Hashtag.find_by_name(params[:hashtag])
    @hashtagged_posts = @hashtag.hashtaggables.map(&:post_id).uniq
    @hashtagged = Post.where('id in (?)', @hashtagged_posts).paginate(:page => params[:page], :per_page => 12)
  end

end
