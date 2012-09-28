var url_servicios = "../resources";
var cont_importados = 0;
var total_estudiantes =0;

$(document).ready(function () {
    $('#btnCargarUsuarios').click(function(){
        ImportarUsuarios();
    });
});

var ImportarUsuarios = function(){
    $('#btnCargarUsuarios').button('loading');
    $('#alertas').addClass("alert-info").html('<strong>Importando Estudiantes</strong>, esta operacion puede tardar unos minutos...');
    $('#alertas').removeClass("alert-success");
    $('#alertas').removeClass("alert-error");
    $.ajax({
        type: 'GET',
        url: url_servicios + '/MantisUserTable/ListarEstuduantesActivosSinImportar',
        dataType: "json",
        success: function(data, textStatus, jqXHR){
            
//            console.dir("Estudiantes Listados");
//            console.dir(data);
            cont_importados = 1;
            total_estudiantes = data.length;
            jQuery.each(data, function(i, val) {               
                var json_estudiante = JSON.stringify(val);
                
                Guardar(json_estudiante);
            });   
             
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.dir('Error JS: ' + textStatus);
            console.dir(jqXHR);
            console.dir(errorThrown);
        }
    });  
}

var Guardar = function(json_estudiante){
   // console.dir(json_estudiante);    
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: url_servicios + '/MantisUserTable',
        dataType: "json",
        data: json_estudiante,
        success: function(data, textStatus, jqXHR){
            
            //console.dir(data);
            if(data.id == "1"){
                $('#alertas').html('<strong>' + cont_importados + ' Estudiantes Importados!</strong>');
                cont_importados = cont_importados +1;
                if(total_estudiantes == cont_importados){
                    $('#btnCargarUsuarios').button('reset');
                    $('#alertas').removeClass("alert-info");
                    $('#alertas').addClass("alert-success").html('Proceso finalizado, se importaron ' + cont_importados + ' Estudiantes');
                    return;
                }
            }
            else{
                $('#alertas').removeClass("alert-info");
                $('#btnCargarUsuarios').button('reset')
                $('#alertas').addClass("alert-error").html(data.mensaje);
                return;
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.dir('Error JS: ' + textStatus);
        }
    });  
    
}


