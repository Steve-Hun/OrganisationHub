class OrganisationsController < ApplicationController
    before_action :set_active_organisations, only: %i[ show index edit update ]
    before_action :get_selected_organisation, only: %i[ edit update show ]

    def show
    end

    def index
    end

    def edit
    end

    def update
        if @organisation.update(organisation_params)
            redirect_to organisation_path(@organisation), notice: "Organisation updated successfully"
        else
            render :edit, status: :unprocessable_entity
        end
    end

    private
        def get_selected_organisation
            @organisation = @organisations&.find { |org| org.id == params[:id].to_i }
        end

        def set_active_organisations
            # Retrieve all active memberships for the current user, map to array of organisations
            @organisations = Membership.get_active_memberships(Current.user)&.map(&:organisation)
        end

        def organisation_params
            params.require(:organisation).permit(:name, :country, :language)
        end
end
