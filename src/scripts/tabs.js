// ponemos al boton de los sitios la funcion de cabioSit
document.getElementById("aMisSitios").addEventListener("click", cambioSit);
// Oculta el div de los sitios guardados
$("#dMisSitios").hide();

function cambioIni() {
    //muestra el mapa
    $("#dInicio").show();
    //oculta los sitos
    $("#dMisSitios").hide();
}
function cambioSit() {
    // oculta el mapa
    $("#dInicio").hide();
    //muestra los sitios guardado
    $("#dMisSitios").show();
    let valGuardados = localStorage.getItem("balizasGuardadas");
    //si no hay nada el local muesta en pantalla que no hay nada
    if (valGuardados == null) {
        $("#dGuardadoError").html("<h4>No hay ninguna baliza guardada!</h4>");
    } else {
        //elimina el contenido de los div de las  balizas y del texto de que no hay nada
        document.getElementById("dGuardadoError").innerHTML = "";
        document.getElementById("dBalizasGuar").innerHTML = "";
        // coloca las balizas de 
        GuardarDatosApi();
    }
}
// funciones accessibles de todos los lados
window.cambioIni = cambioIni;
window.cambioSit = cambioSit;
