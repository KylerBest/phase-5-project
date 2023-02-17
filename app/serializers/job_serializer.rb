class JobSerializer < ActiveModel::Serializer
  attributes :id, :location, :description, :duration_in_hours, :rate, :client, :bill, :plumbers
  belongs_to :client
  has_one :bill
  has_many :assignments
  has_many :plumbers, through: :assignments
end
