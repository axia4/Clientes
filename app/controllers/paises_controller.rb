class PaisesController < ApplicationController
   before_filter :authenticate_user!
  
  # GET /paises
  # GET /paises.json
  def index

    
    @per_page = 5
    params[:page] = 1 if ( params[:page].to_i < 1 )
    @page = ( params[:page].to_i > 0 ) ? params[:page].to_i - 1 : 0
    @skip = ( @per_page * @page )
    

if ( params[:search] )
      
     @paises = Paise.search( params[:search] ).limit(@per_page).skip(@skip)
    elsif ( params[:column] )
      @paises = Paise.sort( params[:column], params[:sort] ).limit(@per_page).skip(@skip)
    else
      @paises = Paise.all.limit(@per_page).skip(@skip)
    end  
  
  @num_of_pages = ( @per_page.to_i > 0 ) ? ( @paises.size / @per_page.to_f ).ceil : 1


respond_to do |format|
      format.html {# index.html.erb
        if ( request.xhr? )
          render( { :partial => 'paises/list', :locals => { :paises => @paises }, :layout => false } )
          return
        end
      }
      format.js {# index.js.erb
        render( :index )
      }
      format.json { render json: @paises }
    end
  end

  # GET /paises/1
  # GET /paises/1.json
  def show
    @paise = Paise.find(params[:id])

    respond_to do |format|
      format.html   {# show.html.erb
       render({ :layout => false } ) if ( request.xhr? )
       }
       format.json { render json: @paise }
    end
  end

  # GET /paises/new
  # GET /paises/new.json
  def new
    @paise = Paise.new
  
    respond_to do |format|
      format.html { # new.html.erb
        render( { :layout => false } ) if ( request.xhr? )
      }
      format.json { render json: @paise }
    end
  end

  # GET /paises/1/edit
  def edit
    @paise = Paise.find(params[:id])
    respond_to do|format|
     format.html   {
       render({ :layout => false } ) 
       }
    end
  end

  # POST /paises
  # POST /paises.json
  def create
    @paise = Paise.new(params[:paise])

    respond_to do |format|
      if @paise.save
         format.html {
          if ( request.xhr? )
            #render json: @paise, status: :created, location: @paise
            render( { :partial => 'paises/paise', :object => @paise, :layout => false } )
          else
            #redirect_to @paise, notice: 'Paise was successfully created.'
          end
        }
        format.json { render json: @paise, status: :created, location: @paise }
      else
        format.html { render action: "new" }
        format.json { render json: @paise.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /paises/1
  # PUT /paises/1.json
  def update
    @paise = Paise.find(params[:id])

    respond_to do |format|
      if @paise.update_attributes(params[:paise])
        format.html{
        if(request.xhr?)
        render({:partial => 'paises/paise', :object => @paise , :layout =>false})
          else
          redirect_to @paise, notice: 'Paise was successfully updated.' 
        end
      }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @paise.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /paises/1
  # DELETE /paises/1.json
  def destroy
    @paise = Paise.find(params[:id])
    @paise.destroy

    respond_to do |format|
      if(request.xhr?)
        format.json { head :no_content }
        else
        format.html { redirect_to paises_url }
        format.json { head :no_content } 
      end
      end
    end
  end
