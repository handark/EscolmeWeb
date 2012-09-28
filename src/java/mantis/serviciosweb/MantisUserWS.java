/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package mantis.serviciosweb;

import escolme.modelo.ayudas.MensajesAjaxAY;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import mantis.modelo.negocio.MantisUserTableBO;

/**
 *
 * @author jose
 */
@Path("MantisUser")
public class MantisUserWS {
    
    @GET
    @Produces({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML})
    public MensajesAjaxAY ImportarEstudiantesAcademusoftMantis(){
        return MantisUserTableBO.ImportarUsuariosAcademusoftMantis();
    }
    
}
