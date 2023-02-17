class Job < ApplicationRecord
  validates :status, inclusion: { in: %w[Requested Accepted Finished Cancel],
    message: "Job status may only be: Requested, Accepted, Finished, or Canceled" }

  belongs_to :client
  has_one :bill
  has_many :assignments
  has_many :plumbers, through: :assignments
end
