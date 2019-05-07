class Game < ApplicationRecord

  has_many :favorites
  has_many :playables
  has_many :users, through: :favorites
  has_many :events, through: :playables
end
