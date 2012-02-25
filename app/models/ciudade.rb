class Ciudade
include Mongoid::Document
  include Mongoid::MultiParameterAttributes


field :nombre, :type => String
  field :codigo, :type => Integer
  field :departamento_codigo, :type => Integer
  
  
  
 
def self.sort( column, sort = :asc )
    if ( column )
    order_by([column.to_sym, sort.to_sym ] )
    end 
  end


  def self.search(search)
    if search
    regexp = /#{search}/
    where(nombre: regexp )
    end 
  end 
end
