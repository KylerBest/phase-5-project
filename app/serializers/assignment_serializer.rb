class AssignmentSerializer < ActiveModel::Serializer
  attributes :id, :hours, :plumber, :job
  has_one :plumber
  has_one :job
end
