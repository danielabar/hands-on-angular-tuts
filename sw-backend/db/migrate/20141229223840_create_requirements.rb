class CreateRequirements < ActiveRecord::Migration
  def change
    create_table :requirements do |t|
      t.string :name
      t.string :value
      t.string :mode
      t.references :edge

      t.timestamps null: false
    end
  end
end
