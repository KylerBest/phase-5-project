class CreateJobs < ActiveRecord::Migration[7.0]
  def change
    create_table :jobs do |t|
      t.references :client_id, null: false, foreign_key: true
      t.string :location
      t.string :description
      t.decimal :duration_in_hours
      t.decimal :rate

      t.timestamps
    end
  end
end
