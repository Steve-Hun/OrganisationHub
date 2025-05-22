class RegistrationsController < ApplicationController
    allow_unauthenticated_access only: %i[ new create ]
    def new
    end

    def create
        all_params = required_params

        user_params = {
            name: all_params[:name],
            email_address: all_params[:email_address],
            password: all_params[:password],
            password_confirmation: all_params[:password_confirmation]
        }

        membership_params = {
            organisation_id: all_params[:organisation_id],
            status: "active"
        }

        @user = User.new(user_params)
        @membership = @user.memberships.build(membership_params)

        # Rails automatically validate password and password_confirmation
        if @user.save
            start_new_session_for @user
            redirect_to organisations_url   
        else
            render :new, alert: "Try another email address or password."
        end
    end

    private
        def required_params
            params.permit(:organisation_id, :name, :email_address, :password, :password_confirmation)
        end
end