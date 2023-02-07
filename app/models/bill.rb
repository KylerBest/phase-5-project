class Bill < ApplicationRecord
  belongs_to :client_id
  belongs_to :job_id
end
