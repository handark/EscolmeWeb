/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package escolme.academico.serviciosweb;

import escolme.academico.modelo.entidades.LiquidacionAC;
import escolme.academico.modelo.negocio.LiquidacionesBO;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * @author Jose Luis Orozco Mejia
 * @since 07-06-2012
 */
@Path("/Liquidaciones")
public class LiquidacionesWS {
    
    @GET
    @Path("ListarLiquidacionesPorPagar/{PEUN_ID}/{LIQU_ESTADO}")
    @Produces({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML})
    public List<LiquidacionAC> ListarLiquidacionesPorPagar(@PathParam("PEUN_ID") int PEUN_ID,@PathParam("LIQU_ESTADO") String LIQU_ESTADO){
        return LiquidacionesBO.ListarLiquidacionesPorPagar(PEUN_ID,LIQU_ESTADO);
    }

    @GET
    @Path("ListarLiquidacionesPorPersona/{ESTP_ID}")
    @Produces({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML})
    public List<LiquidacionAC> ListarLiquidacionesPorPersona(@PathParam("ESTP_ID") int ESTP_ID){
        return LiquidacionesBO.ListarLiquidacionesPorPersona(ESTP_ID);
    }
    
}
