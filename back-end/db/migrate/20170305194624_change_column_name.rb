class ChangeColumnName < ActiveRecord::Migration[5.0]
  def change
    rename_column :contacts, :phone, :phoneNumber
  end
end
