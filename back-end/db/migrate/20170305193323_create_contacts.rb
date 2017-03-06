class CreateContacts < ActiveRecord::Migration[5.0]
  def change
    create_table :contacts do |t|
      t.string :firstName
      t.string :lastName
      t.string :email
      t.string :phone

      t.timestamps
    end
  end
end
