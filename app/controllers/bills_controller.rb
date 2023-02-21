class BillsController < ApplicationController

    def pay
        bill = @current_user.bills.find_by(id: params[:id])
        bill.update!(paid: true)
        render json: @current_user, status: :ok
    end

end
