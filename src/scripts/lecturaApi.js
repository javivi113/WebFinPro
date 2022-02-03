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
setInterval(updateData, 10000);
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