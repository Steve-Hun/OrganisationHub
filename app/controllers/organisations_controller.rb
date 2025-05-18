class OrganisationsController < ApplicationController
    before_action :set_active_organisations, only: %i[ show index ]

    def show
        @organisation = @organisations&.find { |org| org.id == params[:id].to_i }
    end
    
    def index
    end


    private
        def set_active_organisations
            # Retrieve all active memberships for the current user, map to array of organisations
            @organisations = Membership.get_active_memberships(Current.user)&.map(&:organisation)
        end
end
