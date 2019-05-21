require 'rails_helper'


describe Attendance do
  it { should have_valid(:event_id).when(3) }
  it { should_not have_valid(:event_id).when("", nil) }
  it { should have_valid(:user_id).when(7) }
  it { should_not have_valid(:user_id).when("", nil) }
  it { should have_valid(:attendance_type).when("attending", "", nil) }
end
