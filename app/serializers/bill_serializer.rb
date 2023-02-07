class BillSerializer < ActiveModel::Serializer
  attributes :id, :amount, :has_been_paid
  has_one :client_id
  has_one :job_id
end
