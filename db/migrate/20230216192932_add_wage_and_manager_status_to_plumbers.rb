class AddWageAndManagerStatusToPlumbers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :wage, :decimal
    add_column :users, :manager, :boolean
  end
end
