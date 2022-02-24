class SubmitController < ApplicationController

  def create
      task = Task.create(submit_params)
      infodata = get_params
      if (task.save)
        render json: { data: infodata, status: :ok, message: 'Success' }
      else
        not_found
      end
    end

    private
    def submit_params
      params.require(:submit).permit(:name, :status, :user_id)
    end

    def get_params
      params.require(:submit).permit(:infodata)
    end
    def not_found
      render json: { message: "Cannot create"}, status: 0
    end

end
