function cambioIni(){$("#dInicio").show(),$("#dMisSitios").hide(),colocarMarcadores()}function cambioVerBaliza(){$("#dInicio").hide(),$("#dMisSitios").hide(),$("#dVisializar").show()}function cambioSit(){$("#dInicio").hide(),$("#dMisSitios").show();localStorage.getItem("balizasGuardadas");null==localStorage.getItem("balizasGuardadas")?$("#dGuardadoError").html("<h4>No hay ninguna baliza guardada!</h4>"):(document.getElementById("dGuardadoError").innerHTML="",document.getElementById("dBalizasGuar").innerHTML="",GuardarDatosApi())}document.getElementById("aInicio").addEventListener("click",cambioIni),document.getElementById("aMisSitios").addEventListener("click",cambioSit),$("#dMisSitios").hide(),window.cambioSit=cambioSit;
//# sourceMappingURL=index.76415195.js.map