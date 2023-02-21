class AddJoinDateToAssignments < ActiveRecord::Migration[7.0]
  def change
    add_column :assignments, :join_date, :datetime
  end
end
