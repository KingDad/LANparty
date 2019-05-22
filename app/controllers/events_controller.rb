class EventsController < ApplicationController
  before_action :authorize_user

  def index
  end

  def show
  end

  def new
  end

  def edit
  end

  def delete
  end

  def authorize_user
    if !user_signed_in?
      flash[:notice] = "You need to login or sign up to use LANparty"
      redirect_to '/users/sign_in'
    end
  end
end
