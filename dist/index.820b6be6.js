document.getElementById("btnInicioSesion").addEventListener("click",IniciarSes);const urlTiempo="http://10.10.17.119/apiTiempo",urlUsers="http://10.10.17.119/apiUsers";function IniciarSes(){let e=$("#inpUsuario").val(),o=$("#inpContraseña").val();fetch(`${urlUsers}/authenticate`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,password:o})}).then((e=>e.json())).then((e=>{"Username or password is incorrect"!=e.message?(localStorage.setItem("Key",JSON.stringify(e.token)),localStorage.setItem("Sesion","true"),$(".dLogin").hide(),$("#SesionIniciada").show(),$(".inicioPanel").hide(),$("body").css({"background-image":"","background-position":"center","background-repeat":"no-repeat","background-size":"cover"}),location.reload()):(localStorage.setItem("Sesion","false"),alert("Usuario y/o contraseña no son correctos"))}))}window.urlTiempo=urlTiempo,window.urlUsers=urlUsers;
//# sourceMappingURL=index.820b6be6.js.map
