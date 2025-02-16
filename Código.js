function enviarWhatsApp(e) {
    var hoja = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var datos;
    
    // Si 'e' está definido, obtiene los datos desde el evento
    if (e && e.values) {
        datos = e.values;
    } else {
        // Si no hay evento, obtiene la última fila de la hoja
        var ultimaFila = hoja.getLastRow();
        datos = hoja.getRange(ultimaFila, 1, 1, hoja.getLastColumn()).getValues()[0];
    }
    
    var mensaje = "📩 *Nueva respuesta en el formulario:*\n";
    
    for (var i = 1; i < datos.length; i++) {
        mensaje += "*Pregunta " + i + "*: " + datos[i] + "\n";
    }

    // Número de WhatsApp con código de país (sin "+")
    var telefono = "573184350844";
    
    // Enlace de API de WhatsApp (Usando CallMeBot o Twilio)
    var url = "https://api.callmebot.com/whatsapp.php?phone=" + telefono + 
              "&text=" + encodeURIComponent(mensaje) + "&apikey=5743021";
    
    // Enviar la solicitud
    UrlFetchApp.fetch(url);
}

function activarTrigger() {
    var triggers = ScriptApp.getProjectTriggers();
    
    // Verifica si el trigger ya existe
    var triggerExiste = triggers.some(trigger => trigger.getHandlerFunction() === "enviarWhatsApp");

    if (!triggerExiste) {
        ScriptApp.newTrigger("enviarWhatsApp")
            .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
            .onFormSubmit()
            .create();
    }
}

