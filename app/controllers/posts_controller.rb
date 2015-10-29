class PostsController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: Post.all
  end
end
