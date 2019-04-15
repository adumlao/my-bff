class CommentsController < ApplicationController
  before_action :ensure_signed_in

  def all
    render json: { comments: Comment.order("created_at").all }
  end

  def index
    @user = User.find(params[:user_id])
    @post = Post.find(params[:post_id])
    @comments = Comment.where(user_id: @user.id,  post_id: @post.id)
    comments = @posts.order("created_at")
    render json: comments
  end

end
