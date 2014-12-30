require 'rails_helper'

describe Api::EdgesController do
  describe "GET index" do
    it 'responds with 200 status' do
      get 'index'
      expect(response.status).to eq(200)
    end
    it 'responds with JSON' do
      category = Category.create(name: 'categoryName')
      requirement = Requirement.create(name: 'requirementName', value: 'requirementValue', mode: 'rank')
      # edge = Edge.create({ name: 'edgeName', description: 'edgeDescription', category: category, requirements: [ requirement ]})
      edge = Edge.create(name: 'edgeName', description: 'edgeDescription', category: category, requirements: [ requirement ])

      get 'index'
      parsed = JSON.parse(response.body)
      puts parsed
      # expect(parsed[0]["category"]["name"]).to eq('category')
      # expect(response.body[0]["category"]["name"]).to eq('category')
    end
  end
end