class Assignment < ApplicationRecord
  belongs_to :plumber
  belongs_to :job
  attribute :hours, :decimal, default: 0
end
