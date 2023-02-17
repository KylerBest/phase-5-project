class Client < User
    self.table_name = 'users'
    has_many :jobs
    has_many :bills, through: :jobs
end
