class Api::V1::EventsController < ApplicationController
  def index
    render json: Event.all
  end

  def show
    render json: Event.find(params[:id])
  end

  def create
    event = Event.find(params[:id])
    if !event
      event = Event.create(title: params[:title], description: params[:description], event_datetime: params[:event_datetime], twitch_stream: params[:twitch_stream], creator_id: current_user.id)
      params[:playables].each do | gameID |
        Playable.create(event_id: event.id, game_id: gameID)
      end
    end
  end
end
