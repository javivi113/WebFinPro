let getsVal;
//Funcion para elinar las balizas del localstorage
function delBaliza(loc) {
    let valGuardados = JSON.parse(localStorage.getItem("balizasGuardadas"));
    let asBalizas = new Array();
    let i = 0;
    let del = 0;
    valGuardados.forEach(a => {
        if (a[0] == loc) {
            del = i;
        }
        i++;
    });
    i = 0;
    let m = 0;
    // Se salta la posicion en la que esta la baliza a eliminar
    valGuardados.forEach(a => {
        if (i != del) {
            asBalizas[m] = a;
            m++;
        }
        i++;
    })
    //Guardamos los cambios
    localStorage.setItem("balizasGuardadas", JSON.stringify([...asBalizas]));
    cambioInicial();
}
window.delBaliza = delBaliza;
// Añade la baliza al localstorage preveniendo de que este repetida
// y crea el bloque donde estan los datos de esta
function addBaliza() {
    let localBalizas = new Array();
    let asBalizas = new Set();
    let bal = this.value;
    let i = 0;
    cambioSit();
    let valGuardados = localStorage.getItem("balizasGuardadas");
    if (valGuardados == undefined) {
        console.log("solo hay uno")
        localBalizas[0] = [bal, "", "", "", ""]
        document.getElementById("dGuardadoError").innerHTML = "";
        fetch(`${urlTiempo}/${bal}`, {
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
            //Guarda los cambios
        localStorage.setItem("balizasGuardadas", JSON.stringify([...localBalizas]));
    } else {
        document.getElementById("dGuardadoError").innerHTML = "";
        asBalizas = new Set();
        getsVal = JSON.parse(valGuardados);
        getsVal.forEach(a => {
            asBalizas.add(a[0]);
            localBalizas[i] = a;
            i++;
        })
        if (!asBalizas.has(bal)) {
            if (asBalizas.size < 3) {
                localBalizas[i] = [bal, "", "", "", ""]
                asBalizas.add(bal);
                fetch(`${urlTiempo}/${bal}`, {
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
                alert("No puedes añadir mas de 3 balizas.");
            }

        }
        localStorage.setItem("balizasGuardadas", JSON.stringify([...localBalizas]));
    }
}
// Funcion que crea el div con los datos de cada localidad
//estos datos estaran oculos por defecto
function crearBloque(a, temp, descTiempo, imgTiempo, velViento, precipitaciones) {
    var fecha = new Date;
    document.getElementById("dBalizasGuar").innerHTML +=
        `<div class="col-sm-3 balizasGuardada dropAqui" value="${a}">
        <h6 class="hLocalidadGuardada">${a}</h6>
        <div class="dBloqueDatos">
            <div class="dEstado" id="dDatEstado${a}">
                <!--<p>${fecha.getHours()}:${fecha.getMinutes()}</p>-->
                <p>${descTiempo}</p>
            </div>
            <div class="dDatoParam" id="dDatTiempo${a}">
                <i class="bi bi-x-circle btnExit" id="Tiempo_${a}" value="${a}"></i>  
                <i class="bi bi-cloud-sun iconoPanel"><img src="https://opendata.euskadi.eus/${imgTiempo}" class="iEstadoTiempo"></img></i>
            </div> 
            <div class="dDatoParam" id="dDatTemperatura${a}">
                <i class="bi bi-x-circle btnExit" id="Temperatura_${a}" value="${a}"></i> 
                <i class="bi bi-thermometer iconoPanel"><span id="spParam1">${temp}&deg;C</span></i>
            </div>
            <div class="dDatoParam" id="dDatPrecipitaciones${a}">
                <i class="bi bi-x-circle btnExit" id="Precipitaciones_${a}" value="${a}"></i> 
                <i class="bi bi-moisture iconoPanel"><span id="spParam2">${precipitaciones} ml/h</span></i>
            </div>  
            <div class="dDatoParam" id="dDatVelViento${a}">
                <i class="bi bi-x-circle btnExit" id="VelViento_${a}" value="${a}"></i> 
                <i class="bi bi-wind iconoPanel"><span id="spParam3">${velViento} km/h</span></i>
            </div>
                       
        </div>    
    </div>`;
    // Los bloques se hara draggeables
    crearBloqueDraggable();
    // cada parametro tendra un boton por si se desea ocultar
    cierraBotones();
    // Se les aplica el drop de parametros
    paramDrop();
    // Guarda en el local storage los cambios de cada baliza
    ocultarMostrarParametro(a);

}
// funcion que guarda en el local los cambios realizados y los aplica
function ocultarMostrarParametro(loc) {
    let valGuardados = JSON.parse(localStorage.getItem("balizasGuardadas"));
    let i = 0;
    let param = 0;
    valGuardados.forEach(a => {
        if (a[0] == loc) param = i;
        i++;
    });
    valGuardados[param].forEach(a => {
        if (a != loc) $(`#dDat${a}${loc}`).show();
        console.log(`#dDat${a}${loc}`);
    })
}
// funcion para sacar en que posicion de la array iran los parametros
function posParametro(p) {
    switch (p) {
        case "Tiempo":
            return 1;
        case "Precipitaciones":
            return 3;
        case "Temperatura":
            return 2;
        case "VelViento":
            return 4;
    }
}
window.posParametro = posParametro;

// Edita los datos del bloque de cada baliza independientemte si estan siendo mostrados o no
function editarBloque(a, temp, descTiempo, imgTiempo, velViento, precipitaciones) {
    document.getElementById(`dDatTiempo${a}`).innerHTML = `
    <i class="bi bi-x-circle btnExit" id="Tiempo_${a}" value="${a}"></i>  
    <i class="bi bi-cloud-sun iconoPanel"><img src="https://opendata.euskadi.eus/${imgTiempo}" class="iEstadoTiempo"></img></i>`;

    document.getElementById(`dDatTemperatura${a}`).innerHTML = `<i class="bi bi-x-circle btnExit" id="Temperatura_${a}" value="${a}"></i> 
    <i class="bi bi-thermometer iconoPanel"><span id="spParam1">${temp}&deg;C</span></i>`;

    document.getElementById(`dDatPrecipitaciones${a}`).innerHTML = ` <i class="bi bi-x-circle btnExit" id="Precipitaciones_${a}" value="${a}"></i> 
    <i class="bi bi-moisture iconoPanel"><span id="spParam2">${precipitaciones} ml/h</span></i>`;

    document.getElementById(`dDatVelViento${a}`).innerHTML = `<i class="bi bi-x-circle btnExit" id="velViento_${a}" value="${a}"></i> 
    <i class="bi bi-wind iconoPanel"><span id="spParam3">${velViento} km/h</span></i>`;

    document.getElementById(`dDatEstado${a}`).innerHTML = `<p>${descTiempo}</p>`;
    crearBloqueDraggable();
    cierraBotones();
    paramDrop();
}
window.editarBloque = editarBloque;
// funcion que oculata los parametros mostrados en el div de las balizas
// cambias los datos en el localstorage
function cierraBotones() {
    $(".btnExit").on("click", e => {
        e.target.parentElement.style.display = "none";
        let aId = e.target.id.split("_");
        let sParam = aId[0];
        let loc = aId[1];

        $(`#dDat${sParam}${loc}`).hide();
        let valGuardados = JSON.parse(localStorage.getItem("balizasGuardadas"));
        let i = 0;
        let pos = 0;
        let iParam = 0;
        switch (sParam) {
            case "Tiempo":
                iParam = 1;
                break;
            case "Precipitaciones":
                iParam = 3;
                break;
            case "Temperatura":
                iParam = 2;
                break;
            case "VelViento":
                iParam = 4;
                break;
        }
        valGuardados.forEach(a => {
            if (a[0] == loc) {
                pos = i;
            }
            i++;
        });
        valGuardados[pos][iParam] = "";
        console.log(valGuardados[pos][iParam]);
        localStorage.setItem("balizasGuardadas", JSON.stringify([...valGuardados]));
    })
}
// funcion no Aplicada 
// creara una ventana individual con los datos de la baliza sin aplicarlo al local storage
function verBaliza() {
    let sBaliza = this.value;
    cambioVerBaliza();
    document.getElementById("hCabBaliza").textContent = sBaliza;
}