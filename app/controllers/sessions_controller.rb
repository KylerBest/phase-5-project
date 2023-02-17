class SessionsController < ApplicationController
    skip_before_action :authorize, only: :login

    def login
        @current_user = User.find_by(email: params[:email])
        if @current_user&.authenticate(params[:password])
            session[:user_id] = @current_user.id
            render json: @current_user, status: :ok
        else
            render json: {errors: ["Invalid email or password"]}, status: :unauthorized
        end
    end

    def logout
        session.delete :user_id
        head :no_content
    end

end
