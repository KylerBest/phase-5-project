class JobsController < ApplicationController

    def index
        jobs = Job.all
        render json: jobs, status: :ok
    end

    def show
        job = Job.find_by(id: params[:id])
        render json: job, status: :ok
    end

    def create
        job = Job.create!(job_params)
        render json: job, status: :created
    end

    private

    def job_params
        params.permit(:id, :client_id, :location, :description, :duration_in_hours, :rate)
    end

end
