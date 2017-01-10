class AvailabilitiesController < ApplicationController
  def new
  end

  def create

  end

  def index
    @dates
    @available_slots = available_slots(date)
  end
end
