class User < ApplicationRecord
    has_secure_password
    validates :name, presence: true
    validates :phone, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true, format: { with: /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i, message: "is invalid" }
    validates :type, inclusion: { in: %w[Plumber Client],
        message: "must be either Plumber or Client" }
end
