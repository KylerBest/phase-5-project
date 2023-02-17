class PlumberSerializer < ActiveModel::Serializer
  attributes :id, :type, :name, :hourly_rate, :jobs

  has_many :assignments
  has_many :jobs, through: :assignments
end
