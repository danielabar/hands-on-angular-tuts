module Api
  class EdgesController < ApplicationController
    def index
      render json: Edge.all, root: false, each_serializer: EdgeSerializer
      # render json: Edge.joins(:category).includes(:category).select("edges.*, categories.name as category_name"), root: false
    end
  end
end