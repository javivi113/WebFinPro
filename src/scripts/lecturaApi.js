// recoge los datos del localstorage y coloca  las balizas seleccionadas en el bloque
function GuardarDatosApi() {
    var valoresLocalSt = localStorage.getItem("balizasGuardadas");
    document.getElementById("dBalizasGuar").innerHTML = "";
    if (valoresLocalSt != undefined || valoresLocalSt != null) {
        window.arrayLoc = JSON.parse(valoresLocalSt);
        if (arrayLoc.length == 1) {
            fetch(`${urlTiempo}/${arrayLoc[0][0]}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("Key"))}`,
                }
            })
                .then(response => response.json())
                .then(b => {
                    crearBloque(b.municipio, b.temperatura, b.descripcionTiempo, b.pathImg, b.velocidadViento, b.precipitaciones);
                })
                .catch(err => console.log(err));
        } else {
            arrayLoc.forEach(a => {
                fetch(`${urlTiempo}/${a[0]}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("Key"))}`,
                    }
                })
                    .then(response => response.json())
                    .then(b => {
                        crearBloque(b.municipio, b.temperatura, b.descripcionTiempo, b.pathImg, b.velocidadViento, b.precipitaciones);
                    })
                    .catch(err => console.log(err));
            });
        }
    }
}
//se lanza el update de datos cada 10 minutos
setInterval(updateData, 10000);
// recoge los datos del local y si hay datos actualiza los nuevos datos por en todos los parametros
//independientemente si estan mostrados o no
function updateData() {
    var valoresLocalSt = localStorage.getItem("balizasGuardadas");
    if (valoresLocalSt != undefined || valoresLocalSt != null) {
        window.arrayLoc = JSON.parse(valoresLocalSt);
        if (arrayLoc.length == 1) {
            fetch(`${urlTiempo}/${arrayLoc[0][0]}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("Key"))}`,
                }
            })
                .then(response => response.json())
                .then(b => {
                    editarBloque(b.municipio, b.temperatura, b.descripcionTiempo, b.pathImg, b.velocidadViento, b.precipitaciones);
                })
                .catch(err => console.log(err));
        } else {
            arrayLoc.forEach(a => {
                fetch(`${urlTiempo}/${a[0]}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("Key"))}`,
                    }
                })
                    .then(response => response.json())
                    .then(b => {
                        editarBloque(b.municipio, b.temperatura, b.descripcionTiempo, b.pathImg, b.velocidadViento, b.precipitaciones);
                    })
                    .catch(err => console.log(err));
            });
        }
    }
}
window.GuardarDatosApi = GuardarDatosApi;                                                          