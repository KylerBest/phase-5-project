class Assignment < ApplicationRecord
  belongs_to :plumber_id
  belongs_to :job_id
end
