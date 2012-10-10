package escolme.vortal.serviciosweb;

import escolme.modelo.ayudas.MensajesAjaxAY;
import escolme.vortal.modelo.entidades.ConfiguracionTipoDocumentosVO;
import escolme.vortal.modelo.negocio.ConfiguracionTipoDocumentosBO;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * @author Jose Luis Orozco Mejia
 * @since 09-10-2012
 */
@Path("/ConfiguracionTipoDocumentos")
public class ConfiguracionTipoDocumentosWS {
    
    @POST
    @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public MensajesAjaxAY GuardarConfiguracionTipoDocumentos(ConfiguracionTipoDocumentosVO tipoDocumentosVO){
        return ConfiguracionTipoDocumentosBO.GuardarConfiguracionTipoDocumentos(tipoDocumentosVO);
    }
    
    @GET
    @Path("ListarConfiguracionTipoDocumentos")
    @Produces({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML,MediaType.TEXT_PLAIN})
    public List<ConfiguracionTipoDocumentosVO> ListarConfiguracionTipoDocumentos(){
        List<ConfiguracionTipoDocumentosVO> usuario = ConfiguracionTipoDocumentosBO.ListarConfiguracionTipoDocumentos();
        return  usuario;
    }    
    
    @GET
    @Path("ListarConfiguracionTipoDocumentosActivos")
    @Produces({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML,MediaType.TEXT_PLAIN})
    public List<ConfiguracionTipoDocumentosVO> ListarConfiguracionTipoDocumentosActivos(){
        List<ConfiguracionTipoDocumentosVO> usuario = ConfiguracionTipoDocumentosBO.ListarConfiguracionTipoDocumentosActivos();
        return  usuario;
    }    
    
}
