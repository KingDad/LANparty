class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :event_datetime, :user_id

  has_many :attendances

  def user_id
    if current_user
      current_user.id
    end
  end
end
