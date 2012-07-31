package escolme.servlet.comun;

import escolme.academico.modelo.entidades.LiquidacionAdjuntoAC;
import escolme.academico.modelo.entidades.PersonaNaturalGeneralAC;
import escolme.academico.modelo.negocio.LiquidacionAdjuntoBO;
import escolme.academico.modelo.negocio.PersonaNaturalGeneralBO;
import escolme.modelo.ayudas.MensajesAjaxAY;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.sql.Date;
import java.util.Calendar;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.io.IOUtils;

/**
 * @author Jose Luis Orozco
 * @since 24-07-2012
 */
public class OctetStreamReader extends HttpServlet {

    private static final long serialVersionUID = 6748857432950840322L;
    private static final String DESTINATION_DIR_PATH = "files";
    private static String realPath;

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        realPath = getServletContext().getRealPath(DESTINATION_DIR_PATH) + "/";
    }


    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException {

        PrintWriter writer = null;
        InputStream is = null;
        FileOutputStream fos = null;

        try {
            writer = response.getWriter();
        } catch (IOException ex) {
            log(escolme.servlet.comun.OctetStreamReader.class.getName() + "has thrown an exception: " + ex.getMessage());
        }

        String filename = request.getHeader("X-File-Name");
        String no_liquidacion = request.getParameter("no_liquidacion");
        
        try {
            
            PersonaNaturalGeneralAC persona = PersonaNaturalGeneralBO.CargarPersonaPorPegeId(Long.valueOf(no_liquidacion));
            
            is = request.getInputStream();
            fos = new FileOutputStream(new File(realPath + filename.replaceAll(filename, persona.getPEGE_DOCUMENTOIDENTIDAD() + ".pdf")));
            IOUtils.copy(is, fos);
            
            //Guardar los datos en la base de datos
            Calendar calendario = Calendar.getInstance();
            Date fecha = new Date(calendario.getTimeInMillis());
            LiquidacionAdjuntoAC adjunto = new LiquidacionAdjuntoAC();
            adjunto.setLIAD_ARCHIVO(filename.replaceAll(filename, persona.getPEGE_DOCUMENTOIDENTIDAD() + ".pdf"));
            adjunto.setPEGE_ID(Long.valueOf(no_liquidacion));
            
            adjunto.setPEGE_DOCUMENTOIDENTIDAD(persona.getPEGE_DOCUMENTOIDENTIDAD());
            adjunto.setLIAD_FECHA(fecha);
            MensajesAjaxAY guardar = LiquidacionAdjuntoBO.GuardarAdjuntoLiquidacion(adjunto);
            
            
            response.setStatus(HttpServletResponse.SC_OK);
            writer.print("{adjunto agregado: " + String.valueOf(guardar.getID()) + "}");
        } catch (FileNotFoundException ex) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            writer.print("{success: false}");
            log(escolme.servlet.comun.OctetStreamReader.class.getName() + "has thrown an exception: " + ex.getMessage());
        } catch (IOException ex) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            writer.print("{success: false}");
            log(escolme.servlet.comun.OctetStreamReader.class.getName() + "has thrown an exception: " + ex.getMessage());
        } finally {
            try {
                fos.close();
                is.close();
            } catch (IOException ignored) {
            }
        }

        writer.flush();
        writer.close();
    }
}