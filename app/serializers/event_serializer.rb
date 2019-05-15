class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :event_datetime, :user_id, :twitch_stream, :viewers, :attendees, :current_user_attendance_type

  has_many :playables
  has_many :attendances

  def user_id
    if current_user
      current_user.id
    end
  end

  def current_user_attendance_type
    current_user_attendance_type = "none"
    if current_user
      if Attendance.find_by(user_id: current_user.id, event_id: object.id)
        current_user_attendance_type = Attendance.find_by(user_id: current_user.id, event_id: object.id).attendance_type
      end
    end
    current_user_attendance_type
  end
end
