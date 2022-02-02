
cambioInicial();
function cambioInicial() {
    try {
        let NuevaSesion = JSON.parse(localStorage.getItem("balizasGuardadas"));
        if (NuevaSesion != undefined || NuevaSesion != null) if (NuevaSesion.length != 0) setTimeout(cambioSit, 100);
    } catch (a) {
    }
}
window.cambioInicial = cambioInicial;