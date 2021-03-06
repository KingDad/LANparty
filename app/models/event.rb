class Event < ApplicationRecord
  has_many :playables
  has_many :attendances
  has_many :users, through: :attendances

  validates :title, uniqueness: true
  validates :title, presence: true
  validates :event_datetime, presence: true
  validates :creator_id, presence: true

  def attendees
    attendees = 0
    attendances.each do |attendance|
      if attendance.attendance_type == 'attending'
        attendees += 1
      end
    end
    attendees
  end

  def viewers
    viewers = 0
    attendances.each do |attendance|
      if attendance.attendance_type == 'viewing'
        viewers += 1
      end
    end
    viewers
  end
end
