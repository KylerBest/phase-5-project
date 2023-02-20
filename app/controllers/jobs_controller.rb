class JobsController < ApplicationController

    def index
        jobs = @current_user.jobs
        render json: jobs, status: :ok
    end

    def show
        job = Job.find_by(id: params[:id])
        render json: job, status: :ok
    end

    def create
        @current_user.jobs.create!(job_params)
        render json: @current_user, status: :ok
    end

    private

    def job_params
        params.permit(:id, :client_id, :type_of_work, :description, :hours, :rate, :status)
    end

end