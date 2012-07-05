package escolme.academico.serviciosweb;

import com.google.gson.Gson;
import escolme.academico.modelo.entidades.PagoLiquidacionAC;
import escolme.academico.modelo.negocio.PagoLiquidacionBO;
import escolme.modelo.ayudas.MensajesAjaxAY;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

/**
 * @author Jose Luis Orozco Mejia
 * @since 
 */
@Path("/PagoLiquidacion")
public class PagoLiquidacionWS {

    @GET
    @Path("ListarPagosPorLiquidacion/{LIQU_ID}")
    @Produces({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML})
    public List<PagoLiquidacionAC> ListarPagosPorLiquidacion(@PathParam("LIQU_ID") int LIQU_ID){
        return PagoLiquidacionBO.ListarPagosPorLiquidacion(LIQU_ID);
    }
    
    @GET
    @Path("CargarPagoPorID/{PALI_ID}")
    @Produces({MediaType.APPLICATION_JSON,MediaType.APPLICATION_XML})
    public PagoLiquidacionAC CargarPagoPorID(@PathParam("PALI_ID") int PALI_ID){
        return PagoLiquidacionBO.CargarPagoPorID(PALI_ID);
    }
    
    @POST
    @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public MensajesAjaxAY GuardarPagoLiquidacion(String pagos) {
        Gson gson = new Gson();
        MensajesAjaxAY resultado = null;
        try{
            Calendar calendario = Calendar.getInstance();
            Date fecha = new Date(calendario.getTimeInMillis());
            PagoLiquidacionAC pago = gson.fromJson(pagos, PagoLiquidacionAC.class);
            pago.setPALI_FECHA(fecha);
            pago.setPALI_FECHACAMBIO(fecha);
            resultado = PagoLiquidacionBO.GuardarPagoLiquidacion(pago);
        }
        catch(Exception ex){
            resultado = new MensajesAjaxAY();
            resultado.setID("0");
            resultado.setMENSAJE(ex.getMessage());
        }
        finally{
            return resultado;
        }
    }
}
