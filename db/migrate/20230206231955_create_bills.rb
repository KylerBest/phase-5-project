class CreateBills < ActiveRecord::Migration[7.0]
  def change
    create_table :bills do |t|
      t.references :client_id, null: false, foreign_key: true
      t.references :job_id, null: false, foreign_key: true
      t.decimal :amount
      t.boolean :has_been_paid

      t.timestamps
    end
  end
end
