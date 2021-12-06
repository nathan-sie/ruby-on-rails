class Post < ApplicationRecord
  has_one_attached :image
  belongs_to :task
  def image_url
    #Get the URL of the associated image
    image.attached? ? url_for(image) : nil
  end
end
