class DepartamentosController < ApplicationController
    before_filter :authenticate_user!

  # GET /departamentos
  # GET /departamentos.json
  def index
    
    @per_page = 5
    params[:page] = 1 if ( params[:page].to_i < 1 )
    @page = ( params[:page].to_i > 0 ) ? params[:page].to_i - 1 : 0
    @skip = ( @per_page * @page )

       
       
        
    if ( params[:search] )
      #@clientes = Cliente.find(:all, {:conditions => ['Nombre_completo LIKE ?', "%#{params[:search]}%" ]} )
     @departamentos = Departamento.search( params[:search] ).limit(@per_page).skip(@skip)
    elsif ( params[:column] )
      @departamentos = Departamento.sort( params[:column], params[:sort] ).limit(@per_page).skip(@skip)
    else
      @departamentos = Departamento.all.limit(@per_page).skip(@skip)
    end
       
           @num_of_pages = ( @per_page.to_i > 0 ) ? ( @departamentos.size / @per_page.to_f ).ceil : 1

       
       
       respond_to do |format|
      format.html {# index.html.erb
        if ( request.xhr? )
          render( { :partial => 'departamentos/list', :locals => { :departamentos => @departamentos }, :layout => false } )
          return
        end
      }
      format.js {# index.js.erb
        render( :index )
      }
      format.json { render json: @departamentos }
    end
end

  # GET /departamentos/1
  # GET /departamentos/1.json
  def show
    @departamento = Departamento.find(params[:id])

    respond_to do |format|
      format.html {# show.html.erb
      render({:layout=> false}) if(request.xhr?)
    }
      format.json { render json: @departamento }
    end
  end

  # GET /departamentos/new
  # GET /departamentos/new.json
  def new
    @departamento = Departamento.new

    respond_to do |format|
      format.html {# new.html.erb
      render({:layout=> false}) if(request.xhr?)
      }
      format.json { render json: @departamento }
    end
  end

  # GET /departamentos/1/edit
  def edit
    @departamento = Departamento.find(params[:id])
    
    respond_to do |format|
      format.html{
      render({:layout=>false})
      }
    end
  end

  # POST /departamentos
  # POST /departamentos.json
  def create
    @departamento = Departamento.new(params[:departamento])

    respond_to do |format|
      if @departamento.save
        format.html{
        if(request.xhr?)
        render({:partial=> 'departamentos/departamento', :object=> @departamento, :layout=> false})
        else
        #format.html { redirect_to @departamento, notice: 'Departamento was successfully created.' }
      end
      }

      format.json { render json: @departamento, status: :created, location: @departamento }
      else
        format.html { render action: "new" }
        format.json { render json: @departamento.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /departamentos/1
  # PUT /departamentos/1.json
  def update
    @departamento = Departamento.find(params[:id])

    respond_to do |format|
      if @departamento.update_attributes(params[:departamento])
        format.html{
          if(request.xhr?)
            render( { :partial => 'departamentos/departamento', :object => @departamento, :layout => false } )
          else
         redirect_to @departamento, notice: 'Departamento was successfully updated.' 
         end
        }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @departamento.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /departamentos/1
  # DELETE /departamentos/1.json
  def destroy
    @departamento = Departamento.find(params[:id])
    @departamento.destroy

    respond_to do |format|
      if(request.xhr?)
      format.json { head :no_content }
      else
      format.html { redirect_to departamentos_url }
      format.json { head :no_content }
    end
    end
  end
end
