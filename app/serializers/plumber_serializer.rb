class PlumberSerializer < ActiveModel::Serializer
  attributes :id, :type, :name, :email, :phone, :wage, :jobs, :manager
  has_many :assignments
  has_many :jobs, through: :assignments
end
