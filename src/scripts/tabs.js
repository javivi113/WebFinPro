document.getElementById("aInicio").addEventListener("click", cambioIni);
document.getElementById("aMisSitios").addEventListener("click", cambioSit);
//document.getElementById("aApi").addEventListener("click", apiInicioSes);
try {
    let lsSesion = localStorage.getItem("Sesion")
    if (lsSesion == "false" || lsSesion == undefined) {
        $("body").css({
            "background-image": "url(https://www.sansebastianturismoa.eus/images/tematicos/bahia_ss_686.jpg)",
            "background-position": "center",
            "background-repeat": "no-repeat",
            "background-size": "cover"
        });
        setTimeout(function () { $("#SesionIniciada").hide() }, 10);
        $(".dLogin").show();
        $(".inicioPanel").show();
    } else {
        $(".dLogin").hide();
        $("#SesionIniciada").show();
        $(".inicioPanel").hide();
        cambioInicial();
        colocarMarcadores();

    }
}
catch (e) {

}

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
