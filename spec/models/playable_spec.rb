require 'rails_helper'


describe Playable do
  it { should have_valid(:event_id).when(3) }
  it { should_not have_valid(:event_id).when("", nil) }
  it { should have_valid(:game_id).when(1234) }
  it { should_not have_valid(:game_id).when("", nil) }
end
