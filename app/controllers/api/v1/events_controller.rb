class Api::V1::EventsController < ApplicationController
  def index
    render json: Event.all
  end

  def show
    render json: Event.find(params[:id])
  end

  def create
    event = Event.find_by(title: params[:title])
    if !event
      event = Event.create(title: params[:title],
        description: params[:description],
        event_datetime: params[:event_datetime],
        twitch_stream: params[:twitch_stream],
        creator_id: current_user.id
      )
      params[:playables].each do | gameID |
        playable = Playable.find_by(event_id: event.id, game_id: gameID)
        if !playable
          playable = Playable.create(event_id: event.id, game_id: gameID)
        end
      end
    end
  end
end
