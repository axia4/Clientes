// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

function ordenarCliente( column, sort ) {
  //alert( 'Voy a hacer una request donde le voy a pedir al server que me retorne un listado ordenado por : ' + column + ' y el orden va a ser : ' + sort );
  jQuery.get( '/clientes', { column : column, sort : sort }, function( responseText, textStatus, XMLHttpRequest ) {
    jQuery( '#client_list' ).html( responseText );
  //alert( 'Datos actualizados' );
  } );
  return( false );
}

function actualizarCliente( ) {
  jQuery( '#client_list' ).empty();
  alert( 'Empty' );
  jQuery( '#client_list' ).load( '/clientes', function( responseText, textStatus, XMLHttpRequest ) {
    alert( 'Datos actualizados' );
  } );
  
  return( false );
}

function validateClientForm( type ,  cliente_id, use_ajax ) {
  var formId = ( type === 'new' ) ? '#new_cliente' : '.edit_cliente';
  jQuery( formId ).validate( {
    submitHandler : function( form ) {
      if ( cliente_id === 0 && use_ajax === false ) {
        form.submit();
      } else {
        var options = {
          success : function( responseText, statusText, xhr, jObjForm ) {
            //var res= jQuery.parseXML(responseText);
            //var fila= jQuery( '<tr><td>'+res.avatar.url+'</td><td>'+res.Tipo_de_identificacion+'</td><td>'+res.Numero_de_identificacion+'</td><td>'+res.Nombre_completo+'</td><td>'+res.Fecha_de_nacimiento+'<t/d><td>'+res.Sexo+'</td><td>'+res.Pais+'</td><td>'+res.Departamento+'</td><td>'+res.Ciudad+'</td><td></td><td></td><td></td></tr>' )
            
            
            
            if(type=='new')
            {jQuery('table').eq(1).append(responseText);
              jQuery( '#new_client_form').dialog('close');}
              else {
              jQuery('#cliente_' +cliente_id).replaceWith(responseText);
              jQuery('#edit_client_form').dialog('close');
            }
          }
        };
        
        jQuery( form ).ajaxSubmit( options );
      }
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

function showClientForm( type, url, cliente_id ) {
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
        
        validateClientForm( type, cliente_id );
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
