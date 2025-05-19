class PostsController < ApplicationController
    before_action :set_organisation, only: %i[ index new create edit update destroy ]
    before_action :set_organisation_and_active_posts, only: %i[ index ]
    before_action :check_ownership, only: %i[ edit update destroy ]
    before_action :set_post, only: %i[ show edit update destroy ]

    def index
    end

    def show
    end

    def new
        @post = Post.new
    end

    def create
        @post = Post.new(post_params)
        @post.user = Current.user
        @post.organisation = @organisation
        if @post.save
            redirect_to organisation_posts_path(@organisation), notice: "Post created successfully"
        else
            render :new, status: :unprocessable_entity
        end
    end

    def edit
    end

    def update
        if @post.update(post_params)
            redirect_to organisation_posts_path(@organisation), notice: "Post updated successfully"
        else
            render :edit, status: :unprocessable_entity
        end
    end

    def destroy
        @post.destroy
        redirect_to organisation_posts_path(@organisation), notice: "Post deleted successfully"
    end

    # Private methods for before_action
    private 
        def set_organisation_and_active_posts
            posts = Post.includes(:user).where(organisation_id: @organisation.id)

            if params[:employee_info].present?
                posts = posts.joins(:user).where(
                    "LOWER(users.name) LIKE LOWER(?) OR LOWER(users.email_address) LIKE LOWER(?)",
                    "%#{params[:employee_info]}%",
                    "%#{params[:employee_info]}%"
                )
            end

            if params[:start_date].present?
                posts = posts.where("posts.created_at >= ?", params[:start_date])
            end

            if params[:last_updated_date].present?
                posts = posts.where("posts.updated_at >= ?", params[:last_updated_date])
            end

            @posts = posts.select { |post| post.author_currently_active(@organisation.id) } # Return Ruby Array of Posts
        end

        def check_ownership
            @post = Post.find(params[:id])
            unless @post.user == Current.user
                redirect_to organisation_posts_path(@organisation || @post&.organisation), alert: "You are not authorised to change this post"
            end
        end

        def set_organisation
            @organisation = Organisation.find(params[:organisation_id])
        end

        def post_params
            params.require(:post).permit(:description)
        end

        def set_post
            @post = Post.find(params[:id])
        end
end
