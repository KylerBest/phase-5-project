class ClientSerializer < ActiveModel::Serializer
  attributes :id, :name, :phone, :address
end
