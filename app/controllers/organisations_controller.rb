class OrganisationsController < ApplicationController
    before_action :set_organisation, only: %i[ show edit index ]
    # allow_unauthenticated_access only: %i[ index ]

    def show
    end

    def edit
    end
    
    def index
    end


    private
        def set_organisation
            # Current user may not belong to an organisation
            @organisation = Organisation.find(Current.user&.organisation_id)
        end
end
