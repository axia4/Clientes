
function ordenarCiudad( column, sort ) {
  //alert( 'Voy a hacer una request donde le voy a pedir al server que me retorne un listado ordenado por : ' + column + ' y el orden va a ser : ' + sort );
  jQuery.get( '/ciudades', { column : column, sort : sort }, function( responseText, textStatus, XMLHttpRequest ) {
    jQuery( '#ciudad_list' ).html( responseText );
  //alert( 'Datos actualizados' );
  } );
  return( false );
}

function actualizarCiudad( ) {
  jQuery( '#ciudad_list' ).empty();
  alert( 'Empty' );
  jQuery( '#ciudad_list' ).load( '/ciudades', function( responseText, textStatus, XMLHttpRequest ) {
    alert( 'Datos actualizados' );
  } );
  
  return( false );
}

function validateCiudadForm( type ,  ciudade_id, use_ajax ) {
  var formId = ( type === 'new' ) ? '#new_ciudade' : '.edit_ciudade';
  jQuery( formId ).validate( {
    submitHandler : function( form ) {
      if ( ciudade_id === 0 && use_ajax === false ) {
        form.submit();
      } else {
        var options = {
          success : function( responseText, statusText, xhr, jObjForm ) {
            //var res= jQuery.parseXML(responseText);
            //var fila= jQuery( '<tr><td>'+res.avatar.url+'</td><td>'+res.Tipo_de_identificacion+'</td><td>'+res.Numero_de_identificacion+'</td><td>'+res.Nombre_completo+'</td><td>'+res.Fecha_de_nacimiento+'<t/d><td>'+res.Sexo+'</td><td>'+res.Pais+'</td><td>'+res.Departamento+'</td><td>'+res.Ciudad+'</td><td></td><td></td><td></td></tr>' )
            
            
            
            if(type=='new')
            {jQuery('#ciudad_list').append(responseText);
              jQuery( '#new_ciudad_form').dialog('close');}
              else {
              jQuery('#ciudade_' +ciudade_id).replaceWith(responseText);
              jQuery('#edit_ciudad_form').dialog('close');
            }
          }
        };
        
        jQuery( form ).ajaxSubmit( options );
      }
    },
    rules : {
      'ciudade[nombre]' : {
        required : true
      },
      'ciudade[codigo]' : {
        required : true
      },
      'ciudade[departamento_codigo]' : {
        required : true
        
      }
    }
  } );
}

function showCiudadForm( type, url, ciudade_id ) {
  // type : 'new' || 'edit'
  var ciudadFormId = ( type === 'new' ) ? 'new_ciudad_form' : 'edit_ciudad_form';
  var ciudadForm = jQuery( '#' + ciudadFormId );
  
  if ( ciudadForm.length < 1 || type != 'new' ) {
    if ( ciudadForm.length < 1 ) {
      var appendToBody = true;
      ciudadForm = jQuery( '<div id="' + ciudadFormId + '" style="display:none;" />' );
    }
    
    jQuery.ajax( {
      url : url,
      success : function( data ) {
        ciudadForm.html( data );
        
        if ( appendToBody === true ) {
          jQuery( 'body' ).append( ciudadForm );
        }
        
        validateCiudadForm( type, ciudade_id );
        ciudadForm.dialog( { modal : true } );
      }
    } );
  } else if ( type == 'new' ) {
    jQuery( '#new_ciudade' ).validate().resetForm();
    //jQuery( '#new_cliente' )[0].reset();
    ciudadForm.dialog( { modal : true } );
  }
  
  //showUrlInDialog( '/clientes/new', validateClientForm );
  
  return( false );
}
