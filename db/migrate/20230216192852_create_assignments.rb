class CreateAssignments < ActiveRecord::Migration[7.0]
  def change
    create_table :assignments do |t|
      t.references :job, null: false, foreign_key: true
      t.references :plumber, foreign_key: {to_table: :users}
      t.decimal :hours

      t.timestamps
    end
  end
end
