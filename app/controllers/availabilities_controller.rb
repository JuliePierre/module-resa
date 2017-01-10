require 'json'

class AvailabilitiesController < ApplicationController
  def new
  end

  def create
    availabilities_array = JSON.parse(params[:my_data])
    availabilities_array.each do |availability|
      date = Date.parse(availability)
      time = Time.parse(availability).strftime('%H:%M')
      # si la date existe déjà en tant qu'availability, je la supprime de la base de données
      # sinon je la rajoute
      available_date = Availability.new(date: date, start_time: time)
      unless available_date.exists?
        available_date.save
      end
    end
    p availabilities_array
  end

  def index
    @week1 = []
    (0..6).each do |i|
      @week1 << Date.today + i
    end
    @availabilities_dates = Availability.distinct.pluck(:date)
  end
end
