//importamos el leaflet
import L from 'leaflet';
// creamos el mapa
const map = L.map('map').setView([43.0119500, -2.56789], 8.5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// parseamos las balizas del json
const oMarker = JSON.parse(aMarkers);
let bPrim = false;
// creamos los iconos de seleccionado o deseccionado
var selectIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var unSelectIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var arrayIdMarkadores = [];

//funcion que coloca los marcadores
function colocarMarcadores() {
    // fetch para sacar los datos de la base de datos
    fetch(`${urlTiempo}`, {
        //definimos que es un GET
        method: 'GET',
        // Definimos los headers (token)
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("Key"))}`,
        }
    })
        .then(response => {
            //parseamos la respuesta
            return response.json();
        })
        .then(api => {
            // definimos las variables que necesitare
            let i = 0;
            var getsVal = [""];
            var stMunipaNoRep = new Set();
            let aSoloBalizas = new Array();
            let iPosAbali = 0;
            // Guardamos lo que hay en el local storage (aunque este vacio)
            let valGuardados = localStorage.getItem("balizasGuardadas");
            // si esta no esta vacio guardamos los nombres de estas
            if (valGuardados != undefined) {
                getsVal = JSON.parse(valGuardados);
                getsVal.forEach(a => {
                    aSoloBalizas[iPosAbali] = a[0];
                    iPosAbali++;
                })
            }
            // si no esta vacio
            if (arrayIdMarkadores.length != 0) {
                //elimina todos marcadores del mapa que esten guardados
                arrayIdMarkadores.forEach(id => map.removeLayer(id))
            }
            // por cada baliza que hay en el JSON
            oMarker.forEach(b => {
                ç
                //Por cada elemento de la base de datos
                api.forEach(munici => {
                    //***Guardamos los pueblos de la base de datos y del json en minusculas
                    let puebloJson = b.Municipio;
                    let puebloJMinus = puebloJson.toString().toLowerCase();
                    let puebloApi = munici.municipio;
                    let puebloAMinus = puebloApi.toString().toLowerCase();
                    // si el resultado del json contiene el nombre de la DB
                    if (puebloJMinus.includes(puebloAMinus)) {
                        //Si no esta guardado en el set 
                        if (!stMunipaNoRep.has(puebloAMinus)) {
                            // lo guarda para que no se repita
                            stMunipaNoRep.add(puebloAMinus);
                            // Si el array de las balizas del localstorage existe el pueblo guardado anteriormente   
                            if (aSoloBalizas.includes(puebloAMinus)) {
                                // lo pone en el mapa con el marcador negro para diferenciarlo del que no esta guardado
                                let marcador = L.marker([b.GpxY, b.GpxX], { icon: selectIcon })
                                    .bindPopup(puebloAMinus)
                                    .addTo(map)
                                    //Cuando se click el punto del mapa hace que suba o baje un panel con el boton de añadir
                                    .on("click", k => {
                                        if (!bPrim) {
                                            $("#dOpciones").slideDown(100);
                                            bPrim = !bPrim;
                                        } else {
                                            $("#dOpciones").slideToggle(50);
                                            $("#dOpciones").slideToggle(100);
                                        }
                                        // En el panel ese aparece el nombre del pueblo y el boton de eliminar 
                                        $("#dOpciones").html(`<div id="dBalSele"><p class="pDBaliza">${puebloAMinus}</p></div>
            <button id="btnAñadirBaliza" class='btnOpciones' value='${puebloAMinus}'>Eliminar</button>
            <!--<button id="btnVerBaliza" class='btnOpciones' value='${puebloAMinus}'>Ver</button>-->`);
                                        $("#btnAñadirBaliza").on("click", addBaliza);
                                        $("#btnVerBaliza").on("click", verBaliza);

                                    })
                                //lo añade al array de marcadores
                                arrayIdMarkadores.push(marcador);
                            } else {
                                // Le pone el marcador azul porque no esta en localstorage
                                let marcador = L.marker([b.GpxY, b.GpxX], { icon: unSelectIcon })
                                    .bindPopup(puebloAMinus)
                                    .addTo(map)
                                    .on("click", k => {
                                        if (!bPrim) {
                                            $("#dOpciones").slideDown(100);
                                            bPrim = !bPrim;
                                        } else {
                                            $("#dOpciones").slideToggle(50);
                                            $("#dOpciones").slideToggle(100);
                                        }
                                        // en vez de eliminar aparecera añadir
                                        $("#dOpciones").html(`<div id="dBalSele"><p class="pDBaliza">${puebloAMinus}</p></div>
            <button id="btnAñadirBaliza" class='btnOpciones' value='${puebloAMinus}'>Añadir</button>
            <button id="btnVerBaliza" class='btnOpciones' value='${puebloAMinus}'>Ver</button>`);
                                        $("#btnAñadirBaliza").on("click", addBaliza);
                                        $("#btnVerBaliza").on("click", verBaliza);

                                    })
                                //lo añade al array de marcadores
                                arrayIdMarkadores.push(marcador);
                            }
                        }
                    }
                })
            });
        })
        .catch(err => console.log(err));
}
window.colocarMarcadores;
// si la sesion esta en false o vacia 
let lsSesion = localStorage.getItem("Sesion")
if (lsSesion == "false" || lsSesion == undefined) {
    // ponemos el background para el login
    $("body").css({
        "background-image": "url(https://www.sansebastianturismoa.eus/images/tematicos/bahia_ss_686.jpg)",
        "background-position": "center",
        "background-repeat": "no-repeat",
        "background-size": "cover"
    });
    colocarMarcadores();
    // le pongo un event listenerpara el boton de el mapa
    document.getElementById("aInicio").addEventListener("click", function () {
        colocarMarcadores();
        cambioIni();
    });
    // 10ms de delay para ocultar todo lo que no sea del login
    // esto lo hago para que la funcion de los marcadores le de tiempo a poner 
    // si lo intenta poner mientras en el oculto el mapa se buggea
    setTimeout(function () { $("#SesionIniciada").hide() }, 10);
    //muestra el login
    $(".dLogin").show();
    //Mustra el div del div completo
    $(".inicioPanel").show();
    // lo hago asi por si en un futuro se agrega un registrarse
} else {
    // se oculta todo lo del login y muestra lo ya loggeado
    $(".dLogin").hide();
    $("#SesionIniciada").show();
    $(".inicioPanel").hide();
    // coloca los marcadores
    colocarMarcadores();
    // le pongo un event listenerpara el boton de el mapa
    document.getElementById("aInicio").addEventListener("click", function () {
        colocarMarcadores();
        cambioIni();
    });
    // llamamos a la funcion para saber si mostrar el mapa o las 
    // balizas guardadas en caso de haber algo en el localstorage
    cambioInicial();
}

