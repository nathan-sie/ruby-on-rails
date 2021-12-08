json.extract! post, :id, :task_id, :image_url, :created_at, :updated_at
json.url post_url(post, format: :json)
