class UsersController < ApplicationController
    before_action :require_correct_user, only: %i[ edit update show ]
    # before_action :set
    
    def show
        @user = Current.user
    end

    def edit
        @user = Current.user
    end

    def update
        @user = Current.user
        if @user.update(user_params)
            redirect_to user_path(@user)
        else
            render :edit
        end
    end

    private
        def user_params
            fitlered_params = params.require(:user).permit(:name, :email_address, :password)
            
            fitlered_params.delete(:password) if fitlered_params[:password].blank?

            if fitlered_params[:email_address] == Current.user.email_address
                fitlered_params.delete(:email_address)
            end

            fitlered_params
        end
    
        def require_correct_user
            @user = User.find(params[:id])
            unless Current.user == @user
                redirect_to root_path
            end
        end
end
