class CreateMeetings < ActiveRecord::Migration[5.0]
  def change
    create_table :meetings do |t|
      t.date :date
      t.time :start_time
      t.time :end_time
      t.string :status

      t.timestamps
    end
  end
end
