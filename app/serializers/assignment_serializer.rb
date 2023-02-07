class AssignmentSerializer < ActiveModel::Serializer
  attributes :id, :hours_worked
  has_one :plumber_id
  has_one :job_id
end
