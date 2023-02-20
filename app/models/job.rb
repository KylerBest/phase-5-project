class Job < ApplicationRecord
  validates :status, inclusion: { in: ["Requested", "Accepted", "In progress", "Finished", "Canceled"],
    message: "Invalid job status" }

  validates :type_of_work, presence: true

  attribute :status, :string, default: 'Requested'

  belongs_to :client
  has_one :bill
  has_many :assignments
  has_many :plumbers, through: :assignments
end
