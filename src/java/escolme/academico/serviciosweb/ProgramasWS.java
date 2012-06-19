package escolme.academico.serviciosweb;

import escolme.academico.modelo.entidades.ProgramaAC;
import escolme.academico.modelo.negocio.ProgramaBO;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * @author Jose Luis Orozco Mejia
 * @since 
 */
@Path("/Programas")
public class ProgramasWS {

    @GET
    @Path("CargarProgramaPorEstudiantePegeId/{pege_id}")
    @Produces({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML})
    public ProgramaAC CargarProgramaPorEstudiantePegeId(@PathParam("pege_id") int pege_id){
        return ProgramaBO.CargarProgramaPorEstudiantePegeId(pege_id);
    }
    
}
