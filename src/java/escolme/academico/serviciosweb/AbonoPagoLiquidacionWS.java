package escolme.academico.serviciosweb;

import escolme.academico.modelo.entidades.AbonoPagoLiquidacionAC;
import escolme.academico.modelo.negocio.AbonoPagoLiquidacionBO;
import escolme.modelo.ayudas.MensajesAjaxAY;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * @author Jose Luis Orozco Mejia
 * @since 25-06-2012
 */
@Path("/AbonoPagoLiquidacion")
public class AbonoPagoLiquidacionWS {

    @POST
    @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public MensajesAjaxAY GuardarAbonoPagoLiquidacion(AbonoPagoLiquidacionAC abono){
        return AbonoPagoLiquidacionBO.GuardarAbonoPagoLiquidacion(abono);
    }
    
}
