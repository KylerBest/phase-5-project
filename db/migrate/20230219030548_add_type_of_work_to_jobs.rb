class AddTypeOfWorkToJobs < ActiveRecord::Migration[7.0]
  def change
    add_column :jobs, :type_of_work, :string
  end
end
