class CreatePlumbers < ActiveRecord::Migration[7.0]
  def change
    create_table :plumbers do |t|
      t.string :name
      t.decimal :hourly_rate

      t.timestamps
    end
  end
end
