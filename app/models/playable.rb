class Playable < ApplicationRecord
  belongs_to :event
  validates :game_id, presence: true
  validates :event_id, presence: true
end
