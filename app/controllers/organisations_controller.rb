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
            # Current user may not belong to an organisation\
            if Current.user&.organisation_id
                @organisation = Organisation.find(Current.user&.organisation_id)
            else
                @organisation = nil
            end
        end
end
