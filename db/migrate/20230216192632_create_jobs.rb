class CreateJobs < ActiveRecord::Migration[7.0]
  def change
    create_table :jobs do |t|
      t.references :client, foreign_key: {to_table: :users}
      t.string :description
      t.decimal :rate
      t.decimal :hours

      t.timestamps
    end
  end
end
