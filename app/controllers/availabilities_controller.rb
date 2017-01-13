require 'json'

class AvailabilitiesController < ApplicationController
  def new
    @week1 = []
    (0..6).each do |i|
      @week1 << Date.today + i
    end
    @slots = {}
    @week1.each do |d|
      @slots[d] = []
      (0..9).each do |j|
        @slots[d] << DateTime.new(d.year, d.month, d.day, 9 + j)
      end
    end
    @availabilities = Availability.all
    # sort les slots disponibles par time
    @available_datetimes = Availability.distinct.pluck(:time)
    # attention, @available_datetimes est un tableau d'activesupport::timewithzone / à convertir en datetime pour comparer avec les slots
    @available_datetimes.map! { |time| time.to_datetime }
  end

  def create
    availabilities_array = JSON.parse(params[:my_data])
    availabilities_array.each do |availability|
      date = Date.parse(availability)
      time = DateTime.parse(availability)
      # si la date existe déjà en tant qu'availability, je la supprime de la base de données
      # sinon je la rajoute
      available_date = Availability.new(date: date, time: time)
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
  end
end
