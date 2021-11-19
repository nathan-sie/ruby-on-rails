class SigninController < ApplicationController
  # before_action :authorize_access_request!, only: [:destory]
  # user === params[:password]
  def create
    if(params[:email]==nil || params[:email] ==='')
      not_found
    else
      user = User.find_by(email: params[:email])
      if (params[:password]!= nil &&user[:password] === params[:password])
        render json: { data: user, status: :ok, message: 'Success' }
      else
        not_found
      end
    end
    end
  private
  def user_params
    params.require(:user).permit(:email, :password, :name)
  end
  def not_found
    render json: { error: "Cannot find email/password combination"}, status: 0
  end
end
