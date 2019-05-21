require 'rails_helper'


describe Event do
  it { should have_valid(:title).when("Super Game Bros.") }
  it { should_not have_valid(:title).when('', nil) }
  it { should have_valid(:description).when("Come 'round and play some games", "", nil) }
  it { should have_valid(:event_datetime).when('1995-01-01T8:00:00+00:00') }
  it { should_not have_valid(:event_datetime).when('', nil) }
  it { should have_valid(:creator_id).when(4) }
  it { should_not have_valid(:creator_id).when("", nil) }
  it { should have_valid(:twitch_stream).when("", nil, "cuebone64")}
end
