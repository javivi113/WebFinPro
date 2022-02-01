document.getElementById("aInicio").addEventListener("click", cambioIni);
document.getElementById("aMisSitios").addEventListener("click", cambioSit);
//document.getElementById("aApi").addEventListener("click", apiInicioSes);
let lsSesion1 = localStorage.getItem("Sesion");
if (lsSesion1 == "false" || lsSesion1 == undefined) {
    $("body").css({
        "background-image": "url(https://www.sansebastianturismoa.eus/images/tematicos/bahia_ss_686.jpg)",
        "background-position": "center",
        "background-repeat": "no-repeat",
        "background-size": "cover"
    });
    setTimeout(function() {
        $("#SesionIniciada").hide();
    }, 10);
    $(".dLogin").show();
    $(".inicioPanel").show();
} else {
    $(".dLogin").hide();
    $("#SesionIniciada").show();
    $(".inicioPanel").hide();
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
    if (localStorage.getItem("balizasGuardadas") == null) $("#dGuardadoError").html("<h4>No hay ninguna baliza guardada!</h4>");
    else {
        document.getElementById("dGuardadoError").innerHTML = "";
        document.getElementById("dBalizasGuar").innerHTML = "";
        GuardarDatosApi();
    }
}
function apiInicioSes() {
    let lsSesion = localStorage.getItem("Sesion");
    if (lsSesion == undefined) $(".inicioPanel").slideToggle(100);
    else window.location = `${url}/api/Tiempo`;
}

//# sourceMappingURL=index.1955e8a8.js.map
