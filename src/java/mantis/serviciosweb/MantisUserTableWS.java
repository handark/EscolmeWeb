package mantis.serviciosweb;

import escolme.modelo.ayudas.MensajesAjaxAY;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import mantis.modelo.datos.MantisUserTableAC;
import mantis.modelo.negocio.MantisUserTableBO;

/**
 *
 * @author jose
 */
@Path("/MantisUserTable")
public class MantisUserTableWS {
    
    @GET
    @Path("ListarEstuduantesActivosSinImportar")
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public List<MantisUserTableAC> ListarEstuduantesActivosSinImportar(){
        return MantisUserTableBO.ListarEstuduantesActivosSinImportar();

    }
    
    @POST
    @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public MensajesAjaxAY GuardarUsuario(MantisUserTableAC usuario){
        return MantisUserTableBO.GuardarUsuario(usuario);
    }
}
