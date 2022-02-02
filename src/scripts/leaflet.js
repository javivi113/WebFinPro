import L from 'leaflet';
const map = L.map('map').setView([43.0119500, -2.56789], 8.5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const oMarker = JSON.parse(aMarkers);
let bPrim = false;
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

function colocarMarcadores() {
    fetch(`${url}/api/Tiempo`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("Key"))}`,
        }
    })
        .then(response => {
            return response.json();
        })
        .then(api => {
            let i = 0;
            //console.log(api)
            //map.removeLayer(marker)
            var getsVal = [""];
            var stMunipaNoRep = new Set();
            let valGuardados = localStorage.getItem("balizasGuardadas");
            let aSoloBalizas = new Array();
            let iPosAbali = 0;
            if (valGuardados != undefined) {
                getsVal = JSON.parse(valGuardados);
                getsVal.forEach(a => {
                    aSoloBalizas[iPosAbali] = a[0];
                    iPosAbali++;
                })
            }
            if (arrayIdMarkadores.length != 0) {
                arrayIdMarkadores.forEach(id => map.removeLayer(id))
            }
            oMarker.forEach(b => {
                api.forEach(munici => {
                    let puebloJson = b.Municipio;
                    let puebloJMinus = puebloJson.toString().toLowerCase();
                    let puebloApi = munici.municipio;
                    let puebloAMinus = puebloApi.toString().toLowerCase();
                    if (puebloJMinus.includes(puebloAMinus)) {
                        //console.log(`${puebloAMinus}=>${puebloJMinus}`)
                        if (!stMunipaNoRep.has(puebloAMinus)) {
                            stMunipaNoRep.add(puebloAMinus);
                            //console.log(getsVal+"=>"+b.Municipio)   
                            if (aSoloBalizas.includes(puebloAMinus)) {
                                let marcador = L.marker([b.GpxY, b.GpxX], { icon: selectIcon })
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
                                        $("#dOpciones").html(`<div id="dBalSele"><p class="pDBaliza">${puebloAMinus}</p></div>
            <button id="btnAñadirBaliza" class='btnOpciones' value='${puebloAMinus}'>Eliminar</button>
            <button id="btnVerBaliza" class='btnOpciones' value='${puebloAMinus}'>Ver</button>`);
                                        $("#btnAñadirBaliza").on("click", addBaliza);
                                        $("#btnVerBaliza").on("click", verBaliza);

                                    })
                                arrayIdMarkadores.push(marcador);
                            } else {
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
                                        $("#dOpciones").html(`<div id="dBalSele"><p class="pDBaliza">${puebloAMinus}</p></div>
            <button id="btnAñadirBaliza" class='btnOpciones' value='${puebloAMinus}'>Añadir</button>
            <button id="btnVerBaliza" class='btnOpciones' value='${puebloAMinus}'>Ver</button>`);
                                        $("#btnAñadirBaliza").on("click", addBaliza);
                                        $("#btnVerBaliza").on("click", verBaliza);

                                    })
                                arrayIdMarkadores.push(marcador);
                            }


                        }
                    }
                })
            });
        })
        .catch(err => console.log(err));
}
window.colocarMarcadores = colocarMarcadores;
