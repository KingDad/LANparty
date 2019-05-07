class CreatePlayables < ActiveRecord::Migration[5.2]
  def change
    create_table :playables do |t|
      t.belongs_to :game
      t.belongs_to :event
    end
  end
end
