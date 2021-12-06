class PostsController < ApplicationController

    def create 
        if(params[:id] == nil){
          no_image
        }else
          user = User.find_by(id: params[:id)
          render json: {image : user.tasks.last.image , methods: [:image_url],status:1}
    end
    def no_image
      render json: { message: "No Image", status: 0}
    end
  end
  