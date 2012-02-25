
function ordenarDepartamento( column, sort ) {
  //alert( 'Voy a hacer una request donde le voy a pedir al server que me retorne un listado ordenado por : ' + column + ' y el orden va a ser : ' + sort );
  jQuery.get( '/departamentos', { column : column, sort : sort }, function( responseText, textStatus, XMLHttpRequest ) {
    jQuery( '#departament_list' ).html( responseText );
  //alert( 'Datos actualizados' );
  } );
  return( false );
}

function actualizarDepartamento( ) {
  jQuery( '#departament_list' ).empty();
  alert( 'Empty' );
  jQuery( '#departament_list' ).load( '/departamentos', function( responseText, textStatus, XMLHttpRequest ) {
    alert( 'Datos actualizados' );
  } );
  
  return( false );
}

function validateDepartamentForm( type ,  departamento_id, use_ajax ) {
  var formId = ( type === 'new' ) ? '#new_departamento' : '.edit_departamento';
  jQuery( formId ).validate( {
    submitHandler : function( form ) {
      if ( departamento_id === 0 && use_ajax === false ) {
        form.submit();
      } else {
        var options = {
          success : function( responseText, statusText, xhr, jObjForm ) {
            //var res= jQuery.parseXML(responseText);
            //var fila= jQuery( '<tr><td>'+res.avatar.url+'</td><td>'+res.Tipo_de_identificacion+'</td><td>'+res.Numero_de_identificacion+'</td><td>'+res.Nombre_completo+'</td><td>'+res.Fecha_de_nacimiento+'<t/d><td>'+res.Sexo+'</td><td>'+res.Pais+'</td><td>'+res.Departamento+'</td><td>'+res.Ciudad+'</td><td></td><td></td><td></td></tr>' )
            
            
            
            if(type=='new')
            {jQuery('#departament_list').append(responseText);
              jQuery( '#new_departament_form').dialog('close');}
              else {
              jQuery('#departamento_' +departamento_id).replaceWith(responseText);
              jQuery('#edit_departament_form').dialog('close');
            }
          }
        };
        
        jQuery( form ).ajaxSubmit( options );
      }
    },
    rules : {
      'departamento[nombre]' : {
        required : true
      },
      'departamento[codigo]' : {
        required : true
      },
      'departamento[pais_codigo]' : {
        required : true
        
      }
    }
  } );
}

function showDepartamentForm( type, url, departamento_id ) {
  // type : 'new' || 'edit'
  var departamentFormId = ( type === 'new' ) ? 'new_departament_form' : 'edit_departament_form';
  var departamentForm = jQuery( '#' + departamentFormId );
  
  if ( departamentForm.length < 1 || type != 'new' ) {
    if ( departamentForm.length < 1 ) {
      var appendToBody = true;
      departamentForm = jQuery( '<div id="' + departamentFormId + '" style="display:none;" />' );
    }
    
    jQuery.ajax( {
      url : url,
      success : function( data ) {
        departamentForm.html( data );
        
        if ( appendToBody === true ) {
          jQuery( 'body' ).append( departamentForm );
        }
        
        validateDepartamentForm( type, departamento_id );
        departamentForm.dialog( { modal : true } );
      }
    } );
  } else if ( type == 'new' ) {
    jQuery( '#new_departamento' ).validate().resetForm();
    departamentForm.dialog( { modal : true } );
  }
  
  
  return( false );
}
