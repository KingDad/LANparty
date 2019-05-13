class AddTwitchStreamToEvent < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :twitch_stream, :string, default: ""
  end
end
