package escolme.academico.serviciosweb;

import escolme.academico.modelo.entidades.PagoLiquidacionAC;
import escolme.academico.modelo.negocio.PagoLiquidacionBO;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author jose
 */
@Path("/pruebas")
public class PruebasNuevasWS {
    
        @GET
    @Path("ListarPagosPorLiquidacion/{LIQU_ID}")
    @Produces({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML})
    public List<PagoLiquidacionAC> ListarPagosPorLiquidacion(@PathParam("LIQU_ID") int LIQU_ID){
        return PagoLiquidacionBO.ListarPagosPorLiquidacion(LIQU_ID);
    }
    
}
