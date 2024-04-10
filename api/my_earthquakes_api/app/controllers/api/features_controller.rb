module Api
    class FeaturesController < ApplicationController
      def index
        mag_types = params[:mag_type]&.split(',') || ['md', 'ml', 'ms', 'mw', 'me', 'mi', 'mb', 'mlg']
        page = params[:page] || 1
        per_page = params[:per_page] ? [params[:per_page].to_i, 1000].min : 20
  
        @features = Feature.where(mag_type: mag_types).page(page).per(per_page)
  
        render json: {
          data: @features.map do |feature|
            {
              id: feature.id,
              type: "feature",
              attributes: {
                external_id: feature.external_id,
                magnitude: feature.magnitude,
                place: feature.place,
                time: feature.time,
                tsunami: feature.tsunami,
                mag_type: feature.mag_type,
                title: feature.title,
                coordinates: {
                  longitude: feature.longitude,
                  latitude: feature.latitude
                }
              },
              links: {
                external_url: feature.url
              },
              comments: feature.comments 
            }
          end,
          pagination: {
            current_page: @features.current_page,
            total: @features.total_count,
            per_page: @features.limit_value
          }
        }
      end
  
      def create_comment
        @feature = Feature.find(params[:feature_id])
        @comment = @feature.comments.build(comment_params)
  
        if @comment.save
          render json: @comment, status: :created
        else
          render json: @comment.errors, status: :unprocessable_entity
        end
      end
  
      private
  
      def comment_params
        params.require(:comment).permit(:body)
      end
    end
  end

  