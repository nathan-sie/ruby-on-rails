class Task < ApplicationRecord
    include Rails.application.routes.url_helpers
    belongs_to :user
    has_one :post
end
