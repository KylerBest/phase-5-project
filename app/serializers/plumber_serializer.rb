class PlumberSerializer < ActiveModel::Serializer
  attributes :id, :type, :name, :wage, :jobs, :manager
  has_many :assignments
  has_many :jobs, through: :assignments
end
