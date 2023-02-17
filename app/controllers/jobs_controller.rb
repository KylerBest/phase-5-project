class JobsController < ApplicationController

    def index
        client = Client.find_by(id: params[:client_id])
        if client
            jobs = client.jobs
        else
            jobs = Job.all
        end
        render json: jobs, status: :ok
    end

    def show
        job = Job.find_by(id: params[:id])
        render json: job, status: :ok
    end

    def create
        client = Clint.find_by(id: params[:client_id])
        job = client.jobs.create!(job_params)
        job.update(status: "requested")
        render json: job, status: :created
    end

    private

    def job_params
        params.permit(:id, :client_id, :location, :description, :duration_in_hours, :rate)
    end

end