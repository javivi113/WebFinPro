function GuardarDatosApi(){var e=localStorage.getItem("balizasGuardadas");document.getElementById("dBalizasGuar").innerHTML="",null==e&&null==e||(window.arrayLoc=JSON.parse(e),1==arrayLoc.length?fetch(`${url}/api/Tiempo/${arrayLoc[0][0]}`,{method:"GET",headers:{Accept:"application/json",Authorization:`Bearer ${JSON.parse(localStorage.getItem("Key"))}`}}).then((e=>e.json())).then((e=>{crearBloque(e.municipio,e.temperatura,e.descripcionTiempo,e.pathImg,e.velocidadViento,e.precipitaciones)})).catch((e=>console.log(e))):arrayLoc.forEach((e=>{fetch(`${url}/api/Tiempo/${e[0]}`,{method:"GET",headers:{Accept:"application/json",Authorization:`Bearer ${JSON.parse(localStorage.getItem("Key"))}`}}).then((e=>e.json())).then((e=>{crearBloque(e.municipio,e.temperatura,e.descripcionTiempo,e.pathImg,e.velocidadViento,e.precipitaciones)})).catch((e=>console.log(e)))})))}function updateData(){var e=localStorage.getItem("balizasGuardadas");null==e&&null==e||(window.arrayLoc=JSON.parse(e),1==arrayLoc.length?fetch(`${url}/api/Tiempo/${arrayLoc[0][0]}`,{method:"GET",headers:{Accept:"application/json",Authorization:`Bearer ${JSON.parse(localStorage.getItem("Key"))}`}}).then((e=>e.json())).then((e=>{editarBloque(e.municipio,e.temperatura,e.descripcionTiempo,e.pathImg,e.velocidadViento,e.precipitaciones)})).catch((e=>console.log(e))):arrayLoc.forEach((e=>{fetch(`${url}/api/Tiempo/${e[0]}`,{method:"GET",headers:{Accept:"application/json",Authorization:`Bearer ${JSON.parse(localStorage.getItem("Key"))}`}}).then((e=>e.json())).then((e=>{editarBloque(e.municipio,e.temperatura,e.descripcionTiempo,e.pathImg,e.velocidadViento,e.precipitaciones)})).catch((e=>console.log(e)))})))}setInterval(updateData,1e4),window.GuardarDatosApi=GuardarDatosApi;
//# sourceMappingURL=index.74912216.js.map
