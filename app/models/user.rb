class User < ApplicationRecord
    has_secure_password
    validates :name, presence: true
    validates :phone, presence: true
    validates :email, presence: true, uniqueness: true
    validates :type, inclusion: { in: %w[Plumber Client],
        message: "must be either Plumber or Client" }
end
