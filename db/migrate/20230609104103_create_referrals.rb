class CreateReferrals < ActiveRecord::Migration[7.0]
  def change
    create_table :referrals do |t|
      t.string :email, null: false
      t.string :token, null: false
      t.boolean :claimed, null: false, default: false
      t.references :referrer, null: false, foreign_key: { to_table: :users }
      t.references :referred_user, foreign_key: { to_table: :users }, default: nil
      t.timestamps
    end
  end
end
