class AddAttendanceTypeToAttendances < ActiveRecord::Migration[5.2]
  def change
    add_column :attendances, :attendance_type, :string, default: ""
  end
end
