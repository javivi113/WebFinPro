//Al clickar en el boton de iniciar sesion se lanza la funcion 
document.getElementById("btnInicioSesion").addEventListener("click", IniciarSes);
//Redirecciones de la url por el proxy 
const urlTiempo = "http://10.10.17.119/apiTiempo";
const urlUsers = "http://10.10.17.119/apiUsers";
//const url = "http://localhost:5000";


window.urlTiempo = urlTiempo;
window.urlUsers = urlUsers;
//**************************************

function IniciarSes() {
    // recoge los valores de usuario y contraseña
    let usu = $("#inpUsuario").val();
    let cont = $("#inpContraseña").val();

    // hacemos un fetch para verificar el usuario 
    fetch(`${urlUsers}/authenticate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": usu,
            "password": cont
        })
    }).then(response => response.json())
        .then(e => {
            // si existe no saldra devolvera el error
            if (e.message != "Username or password is incorrect") {
                //guardamos el token y que la sesion es valida
                localStorage.setItem("Key", JSON.stringify(e.token))
                localStorage.setItem("Sesion", "true")
                // ocultamos todo lo del login 
                //mostramos el div donde esta todo los datos
                $(".dLogin").hide();
                $("#SesionIniciada").show();
                $(".inicioPanel").hide();
                //quitamos el background
                $("body").css({
                    "background-image": "",
                    "background-position": "center",
                    "background-repeat": "no-repeat",
                    "background-size": "cover"
                });
                location.reload();
            } else {
                localStorage.setItem("Sesion", "false")
                alert("Usuario y/o contraseña no son correctos")
            }
        })
}