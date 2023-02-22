class UsersController < ApplicationController
    skip_before_action :authorize, only: :create

    def show
        render json: @current_user, status: :ok
    end

    def plumbers
        plumbers = Plumber.all
        render json: plumbers, status: :ok
    end

    def raise
        if @current_user.manager
            plumber = Plumber.find_by(id: params[:id])
            plumber.update!(wage: params[:wage])
            render json: Plumber.all, status: :ok
        end
    end

    def create
        case params[:type]

        when 'Client'
            @current_user = Client.create!(user_params)

        when 'Plumber'
            @current_user = Plumber.create!(user_params)
            @current_user.update!(manager: true) if Plumber.all.length < 2
        end
        session[:user_id] = @current_user.id
        render json: @current_user, status: :created

    end
    

    def destroy
        session.delete :user_id
        @current_user.destroy
        head :no_content
    end

    private

    def user_params
        params.permit(:type, :wage, :name, :phone, :address, :email, :password, :password_confirmation)
    end

end
