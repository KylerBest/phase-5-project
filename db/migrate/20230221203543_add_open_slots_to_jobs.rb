class AddOpenSlotsToJobs < ActiveRecord::Migration[7.0]
  def change
    add_column :jobs, :open_slots, :integer
  end
end
