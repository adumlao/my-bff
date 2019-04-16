class CommentsController < ApplicationController
  before_action :ensure_signed_in

  def all
    render json: { comments: Comment.order("created_at").all }
  end

  def create
    @post = Post.find(params[:post_id])
    comment = current_user.comments.create!(comment_params)
    render json: { comment: comment }
  end

  private

  def comment_params
    params.permit(:comment, :comment_by, :post_id, :user_id)
  end

end
