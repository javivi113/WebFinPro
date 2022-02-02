document.getElementById("aInicio").addEventListener("click", cambioIni);
document.getElementById("aMisSitios").addEventListener("click", cambioSit);
//document.getElementById("aApi").addEventListener("click", apiInicioSes);
$("#dMisSitios").hide();
function cambioIni() {
    $("#dInicio").show();
    $("#dMisSitios").hide();
    colocarMarcadores();
}
function cambioVerBaliza() {
    $("#dInicio").hide();
    $("#dMisSitios").hide();
    $("#dVisializar").show();
}
function cambioSit() {
    $("#dInicio").hide();
    $("#dMisSitios").show();
    let valGuardados = localStorage.getItem("balizasGuardadas");
    if (localStorage.getItem("balizasGuardadas") == null) {
        $("#dGuardadoError").html("<h4>No hay ninguna baliza guardada!</h4>");
    } else {
        document.getElementById("dGuardadoError").innerHTML = "";
        document.getElementById("dBalizasGuar").innerHTML = "";
        GuardarDatosApi();
    }
}
window.cambioSit = cambioSit;
