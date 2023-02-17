class Plumber < User
    self.table_name = 'users'
    validates :wage, numericality: {greater_than: 7.25, message: "must be at least minimum wage"}
    attribute :wage, :decimal, default: 12
    attribute :manager, :boolean, default: false
    has_many :assignments
    has_many :jobs, through: :assignments
end
