class Availability < ApplicationRecord
  def available_slots(date)
    available_slots = Availability.where('date = ?', date)
    available_start_time = []
    available_slots.each do |slot|
      available_start_time << slot.start_time
    end
  end
end
