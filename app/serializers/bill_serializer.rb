class BillSerializer < ActiveModel::Serializer
  attributes :id, :amount, :has_been_paid, :client, :job
  has_one :client
  has_one :job
end
