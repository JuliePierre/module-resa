require 'json'

class AvailabilitiesController < ApplicationController
  def new
    @week1 = []
    @week2 = []
    @week3 = []
    @week4 = []
    @week5 = []
    @week6 = []
    @week7 = []
    @week8 = []
    (0..6).each do |i|
      @week1 << Date.today + i
      @week2 << Date.today + i + 7
      @week3 << Date.today + i + 7*2
      @week4 << Date.today + i + 7*3
      @week5 << Date.today + i + 7*4
      @week6 << Date.today + i + 7*5
      @week7 << Date.today + i + 7*6
      @week8 << Date.today + i + 7*7
    end
    @week = [@week1, @week2, @week3, @week4, @week5, @week6, @week7, @week8].flatten
    @slots = {}
    @week.each do |d|
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
    array_to_remove = JSON.parse(params[:to_remove])

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

    array_to_remove.each do |availability|
      date = Date.parse(availability)
      time = DateTime.parse(availability)
      a = Availability.where(date: date, time: time)
      print a
      Availability.delete(a)
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
