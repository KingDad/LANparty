class CreatePlayables < ActiveRecord::Migration[5.2]
  def change
    create_table :playables do |t|
      t.integer :game_id, null: false
      t.belongs_to :event
    end
  end
end
