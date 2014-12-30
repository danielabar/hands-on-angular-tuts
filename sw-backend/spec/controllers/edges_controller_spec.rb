require 'rails_helper'

describe Api::EdgesController do
  describe "GET index" do
    it 'responds with 200 status' do
      get 'index'
      expect(response.status).to eq(200)
    end
  end
end