class CreateAssignments < ActiveRecord::Migration[7.0]
  def change
    create_table :assignments do |t|
      t.references :plumber_id, null: false, foreign_key: true
      t.references :job_id, null: false, foreign_key: true
      t.decimal :hours_worked

      t.timestamps
    end
  end
end
