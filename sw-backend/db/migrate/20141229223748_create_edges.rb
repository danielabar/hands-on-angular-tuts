class CreateEdges < ActiveRecord::Migration
  def change
    create_table :edges do |t|
      t.string :name
      t.text :description
      t.references :category, index: true

      t.timestamps null: false
    end
    add_foreign_key :edges, :categories
  end
end
