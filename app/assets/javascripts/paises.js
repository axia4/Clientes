// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/


function ordenarPais( column, sort ) {
  alert( 'Voy a hacer una request donde le voy a pedir al server que me retorne un listado ordenado por : ' + column + ' y el orden va a ser : ' + sort );
  jQuery.get( '/paises', { column : column, sort : sort }, function( responseText, textStatus, XMLHttpRequest ) {
    jQuery( '#paise_list' ).html( responseText );
  //alert( 'Datos actualizados' );
  } );
  return( false );
}

function actualizarPais( ) {
  jQuery( '#paise_list' ).empty();
  alert( 'Empty' );
  jQuery( '#paise_list' ).load( '/paises', function( responseText, textStatus, XMLHttpRequest ) {
    alert( 'Datos actualizados' );
  } );
  
  return( false );
}

function validatePaisForm( type ,  paise_id, use_ajax ) {
  var formId = ( type === 'new' ) ? '#new_paise' : '.edit_paise';
  jQuery( formId ).validate( {
    submitHandler : function( form ) {
      if ( paise_id === 0 && use_ajax === false ) {
        form.submit();
      } else {
        var options = {
          success : function( responseText, statusText, xhr, jObjForm ) {
            //var res= jQuery.parseXML(responseText);
            //var fila= jQuery( '<tr><td>'+res.avatar.url+'</td><td>'+res.Tipo_de_identificacion+'</td><td>'+res.Numero_de_identificacion+'</td><td>'+res.Nombre_completo+'</td><td>'+res.Fecha_de_nacimiento+'<t/d><td>'+res.Sexo+'</td><td>'+res.Pais+'</td><td>'+res.Departamento+'</td><td>'+res.Ciudad+'</td><td></td><td></td><td></td></tr>' )
            
            
            
            if(type=='new')
            {jQuery( '#paise_list').append(responseText);
              jQuery( '#new_paise_form').dialog('close');}
              else {
              jQuery('#paise_' +paise_id).replaceWith(responseText);
              jQuery('#edit_paise_form').dialog('close');
            }
          }
        };
        
        jQuery( form ).ajaxSubmit( options );
      }
    },
    rules : {
      'paise[nombre]' : {
        required : true
      },
      'paise[codigo]' : {
        required : true
      },
      
    }
  } );
}

function showPaisForm( type, url, paise_id ) {
  // type : 'new' || 'edit'
  var paiseFormId = ( type === 'new' ) ? 'new_paise_form' : 'edit_paise_form';
  var paiseForm = jQuery( '#' + paiseFormId );
  
  if ( paiseForm.length < 1 || type != 'new' ) {
    if ( paiseForm.length < 1 ) {
      var appendToBody = true;
      paiseForm = jQuery( '<div id="' + paiseFormId + '" style="display:none;" />' );
    }
    
    jQuery.ajax( {
      url : url,
      success : function( data ) {
        paiseForm.html( data );
        
        if ( appendToBody === true ) {
          jQuery( 'body' ).append( paiseForm );
        }
        
        validatePaisForm( type, paise_id );
        paiseForm.dialog( { modal : true } );
      }
    } );
  } else if ( type == 'new' ) {
    jQuery( '#new_paise' ).validate().resetForm();
    //jQuery( '#new_cliente' )[0].reset();
    paiseForm.dialog( { modal : true } );
  }
  
  //showUrlInDialog( '/clientes/new', validateClientForm );
  
  return( false );
}
