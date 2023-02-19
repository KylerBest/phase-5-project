class PlumberSerializer < ActiveModel::Serializer
  attributes :id, :type, :name, :wage, :jobs

  has_many :assignments
  has_many :jobs, through: :assignments
end
