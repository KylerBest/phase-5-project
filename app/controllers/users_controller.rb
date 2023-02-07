class UsersController < ApplicationController
    skip_before_action :authorize, only: :certificate

    def show
        render json: @current_user, status: :ok
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def destroy
        session.delete :user_id
        @current_user.destroy
        head :no_content
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation)
    end

end
