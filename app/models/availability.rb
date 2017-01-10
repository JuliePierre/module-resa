class Availability < ApplicationRecord
  def available_slots(date)
    available_slots = Availability.where('date = ?', date)
    available_start_time = []
    available_slots.each do |slot|
      available_start_time << slot.start_time
    end
    return available_start_time
  end

  def exists?
    Availability.find_by_date(self.date) != nil && Availability.where(date: self.date).find_by_start_time(self.start_time) != nil
  end
end
