package escolme.academico.serviciosweb;

import escolme.academico.modelo.entidades.PeriodoUniversidadAC;
import escolme.academico.modelo.negocio.PeriodoUniversidadBO;
import java.awt.PageAttributes;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * @author Jose Luis Orozco Mejia
 * @since 05-06-2012
 */
@Path("/PeriodoUniversidad")
public class PeriodoUniversidadWS {

    @GET
    @Path("ListarPeriodosUniversidad/{ano}")
    @Produces({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML})
    public List<PeriodoUniversidadAC> ListarPeriodosUniversidad(@PathParam("ano") int ano){
        return PeriodoUniversidadBO.ListarPeriodosUniversidad(ano);
    }
    
    
}
