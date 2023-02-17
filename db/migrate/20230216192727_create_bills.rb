class CreateBills < ActiveRecord::Migration[7.0]
  def change
    create_table :bills do |t|
      t.references :job, null: false, foreign_key: true
      t.decimal :amount
      t.boolean :paid

      t.timestamps
    end
  end
end
