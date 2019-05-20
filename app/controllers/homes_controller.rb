class HomesController < ApplicationController
  def index
    if current_user
      render "index.html.erb"
    else
      redirect_to "/users/sign_in"
    end
  end
end
