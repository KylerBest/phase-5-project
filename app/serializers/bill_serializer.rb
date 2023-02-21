class BillSerializer < ActiveModel::Serializer
  attributes :id, :amount, :paid, :job
  has_one :client
  has_one :job
end
