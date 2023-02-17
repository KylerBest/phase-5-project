class AssignmentSerializer < ActiveModel::Serializer
  attributes :id, :hours_worked, :plumber, :job
  has_one :plumber
  has_one :job
end
