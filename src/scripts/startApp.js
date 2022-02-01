
cambioInicial();
function cambioInicial() {
    let NuevaSesion = JSON.parse(localStorage.getItem("balizasGuardadas"));
    if (NuevaSesion != undefined || NuevaSesion != null)if (NuevaSesion.length != 0)setTimeout(cambioSit, 100);
}
window.cambioInicial=cambioInicial;