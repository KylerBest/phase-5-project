class JobSerializer < ActiveModel::Serializer
  attributes :id, :location, :description, :duration_in_hours, :rate
  has_one :client_id
end
