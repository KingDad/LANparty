class Api::V1::AttendancesController < ApplicationController
  def create
    attendance = Attendance.find_by(event_id: params[:event_id], user_id: current_user.id)
    if !attendance
      Attendance.create(event_id: params[:event_id], attendance_type: params[:attendance_type], user_id: current_user.id)
    elsif attendance.attendance_type === params[:attendance_type]
      attendance.update(attendance_type: "none")
    else
      attendance.update(attendance_type: params[:attendance_type])
    end
  end
end
