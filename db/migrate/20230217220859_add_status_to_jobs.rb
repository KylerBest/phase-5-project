class AddStatusToJobs < ActiveRecord::Migration[7.0]
  def change
    add_column :jobs, :status, :string
  end
end
