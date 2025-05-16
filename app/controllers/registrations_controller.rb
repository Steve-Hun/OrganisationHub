class RegistrationsController < ApplicationController
    allow_unauthenticated_access only: %i[ new create ]
    
    def new
        # @user = User.new
    end

    def create
        @user = User.new(user_params)

        # Rails automatically validate password and password_confirmation
        if @user.save
            start_new_session_for @user
            redirect_to organisations_url
        else
            render :new, alert: "Try another email address or password."
        end
    end
    
    private
        def user_params
            params.permit(:organisation_id, :email_address, :password, :password_confirmation)
        end
end

