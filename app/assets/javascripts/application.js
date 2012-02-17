// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .



function showUrlInDialog( url, onSuccess ) {
  var objDiv = jQuery( "<div></div>" );
  url : '/clientes/new',
  jQuery.ajax( {
    url : url,
    success : function( data ) {
      objDiv.html( data ).dialog( { modal : true } ).dialog( 'open' );
      if ( typeof( onSuccess ) == 'function' ) { onSuccess(); }
    }
  } );
  
  return( false );
}

function validateClientForm( type ) {
  var formId = ( type === 'new' ) ? '#new_cliente' : '.edit_cliente';
  jQuery( formId ).validate( {
    submitHandler : function( form ) {
      var options = {
        success : function( responseText, statusText, xhr, jObjForm ) {
          //var res= jQuery.parseXML(responseText);
          //var fila= jQuery( '<tr><td>'+res.avatar.url+'</td><td>'+res.Tipo_de_identificacion+'</td><td>'+res.Numero_de_identificacion+'</td><td>'+res.Nombre_completo+'</td><td>'+res.Fecha_de_nacimiento+'<t/d><td>'+res.Sexo+'</td><td>'+res.Pais+'</td><td>'+res.Departamento+'</td><td>'+res.Ciudad+'</td><td></td><td></td><td></td></tr>' )
          jQuery( 'table' ).eq(1).append(responseText);
          jQuery( '#client_form' ).dialog('close');
        }
      };
      
      jQuery( form ).ajaxSubmit( options );
      //form.submit();
    },
    rules : {
      'cliente[Tipo_de_identificacion]' : {
        required : true
      },
      'cliente[Numero_de_identificacion]' : {
        required : true
      },
      'cliente[Nombre_completo]' : {
        required : true
        
      }
    }
  } );
}

function showClientForm( type, url ) {
  // type : 'new' || 'edit'
  var clientFormId = ( type === 'new' ) ? 'new_client_form' : 'edit_client_form';
  var clientForm = jQuery( '#' + clientFormId );
  
  if ( clientForm.length < 1 || type != 'new' ) {
    if ( clientForm.length < 1 ) {
      var appendToBody = true;
      clientForm = jQuery( '<div id="' + clientFormId + '" style="display:none;" />' );
    }
    
    jQuery.ajax( {
      url : url,
      success : function( data ) {
        clientForm.html( data );
        
        if ( appendToBody === true ) {
          jQuery( 'body' ).append( clientForm );
        }
        
        validateClientForm( type );
        clientForm.dialog( { modal : true } );
      }
    } );
  } else if ( type == 'new' ) {
    jQuery( '#new_cliente' ).validate().resetForm();
    //jQuery( '#new_cliente' )[0].reset();
    clientForm.dialog( { modal : true } );
  }
  
  //showUrlInDialog( '/clientes/new', validateClientForm );
  
  return( false );
}
