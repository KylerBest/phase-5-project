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

    def destroy
        job = @current_user.jobs.find_by(id: params[:id])
        job.destroy
        render json: @current_user, status: :ok
    end

    def pending_requests
        jobs = Job.where(status: "Requested")
        render json: jobs, status: :ok
    end

    def accept
        @current_user.assignments.create!(job_id: params[:id])
        job = Job.find_by(id: params[:id])
        job.update!(status: "Accepted")
        render json: @current_user, status: :ok
    end

    def finish
        job = Job.find_by(id: params[:id])
        job.update!(status: "Finished")
        job.bill.create!(amount: job.rate * job.hours, paid: false)
        render json: job, status: :ok
    end

    private

    def job_params
        params.permit(:id, :plumber_id, :client_id, :type_of_work, :description, :hours, :rate, :status)
    end

end