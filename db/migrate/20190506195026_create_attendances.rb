class CreateAttendances < ActiveRecord::Migration[5.2]
  def change
    create_table :attendances do |t|
      t.belongs_to :event, null: false
      t.belongs_to :user, null: false
    end
  end
end
