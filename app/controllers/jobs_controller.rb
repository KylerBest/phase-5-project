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

    def open_jobs
        jobs = Job.where("open_slots > ?", 0).filter{|j| @current_user.jobs.exclude?(j)}
        render json: jobs, status: :ok
    end

    def leave
        job = @current_user.jobs.find_by(id: params[:id])
        assignment = @current_user.assignments.find_by(job_id: params[:id])
        assignment.destroy
        job.update!(open_slots: job.open_slots + 1)
        render json: @current_user, status: :ok
    end

    def accept
        @current_user.assignments.create!(job_id: params[:id], join_date: DateTime.now.getlocal)
        job = Job.find_by(id: params[:id])
        
        if job.status == "Requested"
            job.update!(status: "Accepted", accept_date: DateTime.now.getlocal, open_slots: job.open_slots-1)
        else
            job.update!(open_slots: job.open_slots-1)
        end

        render json: @current_user, status: :ok
    end

    def start
        job = @current_user.jobs.find_by(id: params[:id])
        job.update!(status: "In progress", start_date: DateTime.now.getlocal)
        render json: @current_user, status: :ok
    end

    def add_slot
        job = @current_user.jobs.find_by(id: params[:id])
        job.update!(open_slots: job.open_slots + 1)
        render json: @current_user, status: :ok
    end

    def finish
        job = @current_user.jobs.find_by(id: params[:id])
        finish_date = DateTime.now.getlocal

        rate = 0
        job.plumbers.each{|p| rate += p.wage}

        hours = ((finish_date - job.start_date) / 1.hour).round(2)

        job.update!(status: "Finished", finish_date: finish_date, hours: hours, rate: rate)
        Bill.create!(job_id:job.id, amount: job.rate * job.hours + 80, paid: false)
        render json: @current_user, status: :ok
    end

    private

    def job_params
        params.permit(:id, :plumber_id, :client_id, :type_of_work, :description, :hours, :rate, :status)
    end

end