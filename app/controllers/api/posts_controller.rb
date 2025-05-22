class Api::PostsController < ApplicationController
    before_action :set_organisation

    def index
        posts = Post.includes(:user).where(organisation_id: @organisation.id)

        # Filter by employee name or email, matching case insensitive
        if params[:employee_info].present?
            posts = posts.joins(:user).where(
                "LOWER(users.name) LIKE LOWER(?) OR LOWER(users.email_address) LIKE LOWER(?)",
                "%#{params[:employee_info]}%",
                "%#{params[:employee_info]}%"
            )
        end

        # Get posts created after the start date
        if params[:start_date].present?
            posts = posts.where("posts.created_at >= ?", params[:start_date])
        end

        # Get posts updated after the last updated date
        if params[:last_updated_date].present?
            posts = posts.where("posts.updated_at >= ?", params[:last_updated_date])
        end

        # Get posts where the author is currently active
        @posts = posts.select { |post| post.author_currently_active(@organisation.id) }
        render json: @posts.as_json(include: {user: {only: [:id, :name, :email_address]}})
    end

    def show
        @post = Post.find(params[:id])
        render json: @post.as_json(include: {user: {only: [:id, :name, :email_address]}})
    end

    def create
        @post = Post.new(post_params)
        @post.user = Current.user
        @post.organisation = @organisation

        if @post.save
            render json: @post, status: :created
        else
            render json: { errors: @post.errors }, status: :unprocessable_entity
        end
    end

    def update
        @post = Post.find(params[:id])
        
        unless @post.user == Current.user
            return render json: { error: "Not authorised to update this post" }, status: :forbidden
        end
        
        if @post.update(post_params)
            render json: @post
        else
            render json: { errors: @post.errors }, status: :unprocessable_entity
        end
    end

    def destroy
        @post = Post.find(params[:id])
        
        unless @post.user == Current.user
            return render json: { error: "Not authorised to delete this post" }, status: :forbidden
        end
        
        @post.destroy
        # Return a 204 No Content response for successful DELETE request
        head :no_content
    end

    private
        def set_organisation
            @organisation = Organisation.find(params[:organisation_id])
        end

        def post_params
            params.require(:post).permit(:description)
        end
end