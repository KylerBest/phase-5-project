class Bill < ApplicationRecord
  belongs_to :job
  has_one :client, through: :job
end
