class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :name
      t.string :status
      t.string :user_id

      t.timestamps
    end
  end
end
