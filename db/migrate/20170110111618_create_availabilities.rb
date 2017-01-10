class CreateAvailabilities < ActiveRecord::Migration[5.0]
  def change
    create_table :availabilities do |t|
      t.date :date
      t.time :start_time
      t.time :end_time
      t.boolean :booked

      t.timestamps
    end
  end
end
