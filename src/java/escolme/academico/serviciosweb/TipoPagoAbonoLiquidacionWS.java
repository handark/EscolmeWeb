package escolme.academico.serviciosweb;

import escolme.academico.modelo.entidades.TipoPagoAbonoLiquidacionAC;
import escolme.academico.modelo.negocio.TipoPagoAbonoLiquidacionBO;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * @author Jose Luis Orozco Mejia
 * @since 27-06-2012
 */
@Path("/TipoPagoAbonoLiquidacion")
public class TipoPagoAbonoLiquidacionWS {

    @GET
    @Produces({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML})
    public List<TipoPagoAbonoLiquidacionAC> ListarTipoPagoLiquidacion(){
        return TipoPagoAbonoLiquidacionBO.ListarTipoPagoAbonoLiquidacion();
    }    
    
}
