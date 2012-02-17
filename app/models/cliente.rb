class Cliente
  include Mongoid::Document
  include Mongoid::MultiParameterAttributes
  
  field :avatar, :type => String
  mount_uploader :avatar, AvatarUploader
  field :Tipo_de_identificacion, :type => String
  field :Numero_de_identificacion, :type => Integer
  field :Nombre_completo, :type => String
  field :Fecha_de_nacimiento, type: Date, default: Date.parse("1989/01/01")
  field :Sexo, :type => String
  field :Pais, :type => String
  field :Departamento, :type => String
  field :Ciudad, :type => String

   
   
 
	

 

   
   
   
end
