package escolme.academico.serviciosweb;

import escolme.academico.modelo.entidades.CreditoEstudianteAC;
import escolme.academico.modelo.negocio.CreditoEstudianteBO;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * @author Jose Luis Orozco Mejia
 * @since 21-06-2012
 */
@Path("/CreditoEstudiante")
public class CreditoEstudianteWS {

    @GET
    @Path("CargarCreditoPorLiquidacion/{LIQU_ID}")
    @Produces({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML})
    public CreditoEstudianteAC CargarCreditoPorLiquidacion(@PathParam("LIQU_ID") long LIQU_ID){
        return CreditoEstudianteBO.CargarCreditoPorLiquidacion(LIQU_ID);
    }
    
    @GET
    @Path("CargarCreditoPorId/{CRES_ID}")
    @Produces({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML})
    public CreditoEstudianteAC CargarCreditoPorId(@PathParam("CRES_ID") long CRES_ID){
        return CreditoEstudianteBO.CargarCreditoPorId(CRES_ID);
    }
    
}
