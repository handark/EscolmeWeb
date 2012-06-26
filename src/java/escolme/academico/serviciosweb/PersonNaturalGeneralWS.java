package escolme.academico.serviciosweb;

import escolme.academico.modelo.entidades.PersonaNaturalGeneralAC;
import escolme.academico.modelo.negocio.PersonaNaturalGeneralBO;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * @author Jose Luis Orozco Mejia
 * @since 08-06-2012
 */
@Path("/Personas")
public class PersonNaturalGeneralWS {

    @GET
    @Path("CargarPersonaPorPegeId/{pege_id}")
    @Produces({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML})
    public PersonaNaturalGeneralAC CargarPersonaPorPegeId(@PathParam("pege_id") long pege_id){
        return PersonaNaturalGeneralBO.CargarPersonaPorPegeId(pege_id);
    }
    
    @GET
    @Path("CargarPersonaPorIdentificacion/{pege_documentoidentidad}")
    @Produces({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML})
    public PersonaNaturalGeneralAC CargarPersonaPorIdentificacion(@PathParam("pege_documentoidentidad") String pege_documentoidentidad){
        return PersonaNaturalGeneralBO.CargarPersonaPorIdentificacion(pege_documentoidentidad);
    }
    
}
