var url = "https://localhost:5001";
function GuardarDatosApi() {
    var valoresLocalSt = localStorage.getItem("balizasGuardadas");
    document.getElementById("dBalizasGuar").innerHTML = "";
    if (valoresLocalSt != undefined || valoresLocalSt != null) {
        window.arrayLoc = JSON.parse(valoresLocalSt);
        if (arrayLoc.length == 1) {
            fetch(`${url}/api/Tiempo/${arrayLoc[0][0]}`)
                .then(response => response.json())
                .then(b => {
                    crearBloque(b.municipio, b.temperatura, b.descripcionTiempo, b.pathImg, b.velocidadViento, b.precipitaciones);
                })
                .catch(err => console.log(err));
        } else {
            arrayLoc.forEach(a => {
                fetch(`${url}/api/Tiempo/${a[0]}`)
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
            fetch(`${url}/api/Tiempo/${arrayLoc[0][0]}`/*,{ headers:{ 'Content-Type': 'application/json',
            'Authentication': `Bearer ${localStorage.getItem("Key")}`,}}*/)
                .then(response => response.json())
                .then(b => {
                    editarBloque(b.municipio, b.temperatura, b.descripcionTiempo, b.pathImg, b.velocidadViento, b.precipitaciones);
                })
                .catch(err => console.log(err));
        } else {
            arrayLoc.forEach(a => {
                fetch(`${url}/api/Tiempo/${a[0]}`)
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