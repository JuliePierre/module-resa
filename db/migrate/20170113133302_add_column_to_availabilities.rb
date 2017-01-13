class AddColumnToAvailabilities < ActiveRecord::Migration[5.0]
  def change
    add_column :availabilities, :time, :datetime
  end
end
