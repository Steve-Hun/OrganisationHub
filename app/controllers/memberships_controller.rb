class MembershipsController < ApplicationController
  before_action :get_organisation, only: %i[ quit ]

  def quit
    if Membership.is_active_member?(Current.user, @organisation)
      @membership = Membership.find_by(user: Current.user, organisation: @organisation)
      @membership.update(status: "inactive")
      redirect_to organisations_path, notice: "You have quit #{@organisation.name} organisation"
    else
      redirect_to organisations_path, alert: "You are not a member of this organisation"
    end
  end

  private
    def get_organisation
      @organisation = Organisation.find(params[:organisation_id])
    end
end
