package escolme.vortal.serviciosweb;

import escolme.vortal.modelo.entidades.UsuarioVO;
import escolme.vortal.modelo.negocio.UsuarioBO;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * @author Jose Luis Orozco Mejia
 * @since 04-06-2012
 */
@Path("/UsuariosVO")
public class UsuarioWS {

    @GET
    @Produces({MediaType.TEXT_PLAIN})
    public String Saludos(){
        return "hola ws";
    }    
    
    @GET
    @Path("AutenticarUsuario/{usua_usuario}/{usua_contrasena}")
    @Produces({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML,MediaType.TEXT_PLAIN})
    public UsuarioVO AutenticarUsuario(@PathParam("usua_usuario") String usua_usuario,@PathParam("usua_contrasena") String usua_contrasena){
        UsuarioVO usuario = UsuarioBO.CargarUsuarioPorCredenciales(usua_usuario, usua_contrasena);
        return  usuario;
    }    

}
