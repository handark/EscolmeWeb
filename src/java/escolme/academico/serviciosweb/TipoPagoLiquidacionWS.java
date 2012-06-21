package escolme.academico.serviciosweb;

import escolme.academico.modelo.entidades.TipoPagoLiquidacionAC;
import escolme.academico.modelo.negocio.TipoPagoLiquidacionBO;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * @author Jose Luis Orozco Mejia
 * @since 20-06-2012
 */
@Path("/TipoPagoLiquidacion")
public class TipoPagoLiquidacionWS {

    @GET
    @Produces({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML})
    public List<TipoPagoLiquidacionAC> ListarTipoPagoLiquidacion(){
        return TipoPagoLiquidacionBO.ListarTipoPagoLiquidacion();
    }
    
}
