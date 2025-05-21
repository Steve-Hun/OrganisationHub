class Api::PostsController < ApplicationController
    before_action :set_organisation
    def show
        @post = Post.find(params[:id])
        render json: @post.as_json(include: {user: {only: [:id, :name, :email_address]}})
    end
    private
    
    def set_organisation
        @organisation = Organisation.find(params[:organisation_id])
    end
