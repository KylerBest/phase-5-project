class AddTimesToJobs < ActiveRecord::Migration[7.0]
  def change
    add_column :jobs, :accept_date, :datetime
    add_column :jobs, :start_date, :datetime
    add_column :jobs, :finish_date, :datetime
  end
end
