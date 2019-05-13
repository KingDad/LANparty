class Event < ApplicationRecord
  has_many :playables
  has_many :attendances
  has_many :users, through: :attendances
end
