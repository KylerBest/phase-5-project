class CreateAssignments < ActiveRecord::Migration[7.0]
  def change
    create_table :assignments do |t|
      t.references :plumber, null: false, foreign_key: {to_table: :users}
      t.references :job, null: false, foreign_key: true

      t.timestamps
    end
  end
end
