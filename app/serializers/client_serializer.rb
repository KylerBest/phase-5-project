class ClientSerializer < ActiveModel::Serializer
  attributes :id, :type, :name, :phone, :address, :jobs, :bills
  has_many :jobs
  has_many :bills, through: :jobs
end
