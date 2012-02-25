class CiudadesController < ApplicationController
    before_filter :authenticate_user!

  # GET /ciudades
  # GET /ciudades.json
  def index

 @per_page = 2
    params[:page] = 1 if ( params[:page].to_i < 1 )
    @page = ( params[:page].to_i > 0 ) ? params[:page].to_i - 1 : 0
    @skip = ( @per_page * @page )



    if ( params[:search] )
     @ciudades = Ciudade.search( params[:search] ).limit( @per_page ).skip( @skip )
    elsif ( params[:column] )
      @ciudades = Ciudade.sort( params[:column], params[:sort] ).limit( @per_page ).skip( @skip )
    else
      @ciudades = Ciudade.all.limit( @per_page ).skip( @skip )
    end
    

@num_of_pages = ( @per_page.to_i > 0 ) ? ( @ciudades.size / @per_page.to_f ).ceil : 1

    
    respond_to do |format|
      format.html {# index.html.erb
        if ( request.xhr? )
          render( { :partial => 'ciudades/list', :locals => { :ciudades => @ciudades}, :layout => false } )
          return
        end
      }
      format.js {# index.js.erb
        render( :index )
      }
      format.json { render json: @ciudades }
    end
  end

  # GET /ciudades/1
  # GET /ciudades/1.json
  def show
    @ciudade = Ciudade.find(params[:id])

    respond_to do |format|
      format.html {# show.html.erb
       render({:layout=>false} ) if(request.xhr?)
      }
      format.json { render json: @ciudade }
    end
  end

  # GET /ciudades/new
  # GET /ciudades/new.json
  def new
    @ciudade = Ciudade.new

    respond_to do |format|
      format.html{ # new.html.erb
     render({:layout=>false }) if(request.xhr?)
     } 
      format.json { render json: @ciudade }
    end
  end

  # GET /ciudades/1/edit
  def edit
    @ciudade = Ciudade.find(params[:id])
     respond_to do|format|
     format.html   {
       render({ :layout => false } )
       }
       end
  end

  # POST /ciudades
  # POST /ciudades.json
  def create
    @ciudade = Ciudade.new(params[:ciudade])

    respond_to do |format|
      if @ciudade.save
        format.html{
        if(request.xhr?)
          render( { :partial => 'ciudades/ciudade', :object => @ciudade, :layout => false } )
          else
          #format.html { redirect_to @ciudade, notice: 'Ciudade was successfully created.' }
        end
        }
        format.json { render json: @ciudade, status: :created, location: @ciudade }
      else
        format.html { render action: "new" }
        format.json { render json: @ciudade.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /ciudades/1
  # PUT /ciudades/1.json
  def update
    @ciudade = Ciudade.find(params[:id])

    respond_to do |format|
      if @ciudade.update_attributes(params[:ciudade])
         format.html {
          if ( request.xhr? )
            render( { :partial => 'ciudades/ciudade', :object => @ciudade, :layout => false } )
        else
        format.html { redirect_to @ciudade, notice: 'Ciudade was successfully updated.' }
         end
         }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @ciudade.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /ciudades/1
  # DELETE /ciudades/1.json
  def destroy
    @ciudade = Ciudade.find(params[:id])
    @ciudade.destroy

    respond_to do |format|
      if(request.xhr?)
      format.json{head:no_content}
      else
      format.html { redirect_to ciudades_url }
      format.json { head :no_content }
    end
    end
  end
end
