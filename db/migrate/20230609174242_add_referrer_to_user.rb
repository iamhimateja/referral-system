class AddReferrerToUser < ActiveRecord::Migration[7.0]
  def change
    add_reference :users, :referrer, null: true, foreign_key: { to_table: :users }
  end
end
