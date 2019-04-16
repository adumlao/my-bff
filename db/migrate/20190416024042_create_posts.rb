class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :body
      t.string :description
      t.string :posted_by
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
