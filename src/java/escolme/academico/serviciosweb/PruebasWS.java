package escolme.academico.serviciosweb;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;

/**
 * REST Web Service
 *
 * @author jose
 */
@Path("resources")
public class PruebasWS {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of PruebasWS
     */
    public PruebasWS() {
    }

    /**
     * Retrieves representation of an instance of escolme.academico.serviciosweb.PruebasWS
     * @return an instance of java.lang.String
     */
    @GET
    @Produces("application/xml")
    public String getXml() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of PruebasWS
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Consumes("application/xml")
    public void putXml(String content) {
    }
}
