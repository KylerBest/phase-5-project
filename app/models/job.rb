class Job < ApplicationRecord
  validates :status, inclusion: { in: ["Requested", "Accepted", "In progress", "Finished"],
    message: "Invalid job status" }

  validates :type_of_work, presence: true
  validates :description, presence: true
  validates :open_slots, numericality: {greater_than: -1, message: "A job cannot have less than 0 open slots"}

  attribute :status, :string, default: 'Requested'
  attribute :open_slots, :integer, default: 1

  belongs_to :client
  has_one :bill, dependent: :destroy
  has_many :assignments, dependent: :destroy
  has_many :plumbers, through: :assignments
end
