class ClientesController < ApplicationController
  before_filter :authenticate_user!
  
  # GET /clientes
  # GET /clientes.json
  def index
    @per_page = 5
    params[:page] = 1 if ( params[:page].to_i < 1 )
    @page = ( params[:page].to_i > 0 ) ? params[:page].to_i - 1 : 0
    @skip = ( @per_page * @page )
    
    if ( params[:search] )
      #@clientes = Cliente.find(:all, {:conditions => ['Nombre_completo LIKE ?', "%#{params[:search]}%" ]} )
     @clientes = Cliente.search( params[:search] ).limit( @per_page ).skip( @skip )
    elsif ( params[:column] )
      @clientes = Cliente.sort( params[:column], params[:sort] ).limit( @per_page ).skip( @skip )
    else
      @clientes = Cliente.all.limit( @per_page ).skip( @skip )
    end
    
    @num_of_pages = ( @per_page.to_i > 0 ) ? ( @clientes.size / @per_page.to_f ).ceil : 1
    
    respond_to do |format|
      format.html {# index.html.erb
        if ( request.xhr? )
          render( { :partial => 'clientes/list', :locals => { :clientes => @clientes }, :layout => false } )
          return
        end
      }
      format.js {# index.js.erb
        render( :index )
      }
      format.json { render json: @clientes }
    end
end

  
  # GET /clientes/1
  # GET /clientes/1.json
  def show
    @cliente = Cliente.find(params[:id])

    respond_to do |format|
      format.html   {# show.html.erb
       render({ :layout => false } ) if ( request.xhr? )
       }
       format.json { render json: @cliente }
    end
  end

  # GET /clientes/new
  # GET /clientes/new.json
  def new
    @cliente = Cliente.new

    respond_to do |format|
      format.html { # new.html.erb
        render( { :layout => false } ) if ( request.xhr? )
      }
      format.json { render json: @cliente }
    end
  end

  # GET /clientes/1/edit
  def edit
    @cliente = Cliente.find(params[:id])
    respond_to do|format|
     format.html   {
       render({ :layout => false } ) 

       }
       end
  end

  # POST /clientes
  # POST /clientes.json
  def create
    @cliente = Cliente.new(params[:cliente])

    respond_to do |format|
      if @cliente.save
        format.html {
          if ( request.xhr? )
            #render json: @cliente, status: :created, location: @cliente
            render( { :partial => 'clientes/cliente', :object => @cliente, :layout => false } )
          else
            #redirect_to @cliente, notice: 'Cliente was successfully created.'
          end
        }
        format.json { render json: @cliente, status: :created, location: @cliente }
      else
        format.html { render action: "new" }
        format.json { render json: @cliente.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /clientes/1
  # PUT /clientes/1.json
  def update
    @cliente = Cliente.find(params[:id])

    respond_to do |format|
      if @cliente.update_attributes(params[:cliente])
        format.html {
          if ( request.xhr? )
            render( { :partial => 'clientes/cliente', :object => @cliente, :layout => false } )
          else
            redirect_to @cliente, notice: 'Cliente was successfully updated.'
          end
        }
        
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @cliente.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /clientes/1
  # DELETE /clientes/1.json
  def destroy
    @cliente = Cliente.find(params[:id])
    @cliente.destroy

    respond_to do |format|
      if (request.xhr?)
        format.json { head :no_content }
        else
      format.html { redirect_to clientes_url }
      format.json { head :no_content }
      end
    end
  end
end
