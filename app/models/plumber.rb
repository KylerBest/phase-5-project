class Plumber < User
    validates :name, presence: true
    validates :hourly_rate, presence: true, numericality: {greater_than: 7.25, message: "must be at least minimum wage"}
end
