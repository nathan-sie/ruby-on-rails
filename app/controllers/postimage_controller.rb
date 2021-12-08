class PostimageController < ApplicationController

    def create 
        if(params[:id] == nil)
          no_image
        else
          user = User.find_by(id: params[:id])
          post = user.tasks.last.post
          render json: {data:post , message:"Success" , status:1}
        end
    end
    
    private
    def postimage_params
      params.require(:task).permit(:name, :status, :user_id)
      params.require(:post).permit(:task_id, :image)
    end

    def no_image
      render json: { message: "No Image", status: 0}
    end

  end
  