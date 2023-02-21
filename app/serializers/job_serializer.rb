class JobSerializer < ActiveModel::Serializer
  attributes :id, :description, :type_of_work,
  :status, :hours, :rate, :client, :bill, 
  :plumbers, :accept_date, :start_date, 
  :finish_date, :open_slots, :created_at
  
  belongs_to :client
  has_one :bill
  has_many :assignments
  has_many :plumbers, through: :assignments
end
