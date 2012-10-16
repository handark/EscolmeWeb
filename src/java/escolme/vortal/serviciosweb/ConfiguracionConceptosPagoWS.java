
package escolme.vortal.serviciosweb;

import escolme.modelo.ayudas.MensajesAjaxAY;
import escolme.vortal.modelo.entidades.ConfiguracionConceptosPagoVO;
import escolme.vortal.modelo.entidades.ConfiguracionTipoDocumentosVO;
import escolme.vortal.modelo.negocio.ConfiguracionConceptosPagoBO;
import escolme.vortal.modelo.negocio.ConfiguracionTipoDocumentosBO;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author jose
 */
@Path("/ConfiguracionConceptosPag")
public class ConfiguracionConceptosPagoWS {

    @POST
    @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public MensajesAjaxAY GuardarConfiguracionConceptosPago(ConfiguracionConceptosPagoVO conceptoPagoVO){
        return ConfiguracionConceptosPagoBO.GuardarConfiguracionConceptosPago(conceptoPagoVO);
    }
    
    @GET
    @Path("ListarConfiguracionConceptosPago")
    @Produces({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML,MediaType.TEXT_PLAIN})
    public List<ConfiguracionConceptosPagoVO> ListarConfiguracionConceptosPago(){
        List<ConfiguracionConceptosPagoVO> listaConceptosPagoVO = ConfiguracionConceptosPagoBO.ListarConfiguracionConceptosPago();
        return  listaConceptosPagoVO;
    }    
    
    @GET
    @Path("ListarConfiguracionConceptosPagoActivos")
    @Produces({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML,MediaType.TEXT_PLAIN})
    public List<ConfiguracionConceptosPagoVO> ListarConfiguracionTipoDocumentosActivos(){
        List<ConfiguracionConceptosPagoVO> listaConceptosPagoVO = ConfiguracionConceptosPagoBO.ListarConfiguracionConceptosPagoActivos();
        return  listaConceptosPagoVO;
    } 
}
