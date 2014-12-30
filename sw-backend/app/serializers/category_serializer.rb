class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name
  has_one :edge
end
