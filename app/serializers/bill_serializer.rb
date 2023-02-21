class BillSerializer < ActiveModel::Serializer
  attributes :id, :amount, :paid, :client, :job
  has_one :client
  has_one :job
end
