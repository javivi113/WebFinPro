document.getElementById("btnInicioSesion").addEventListener("click", IniciarSes);
const urlTiempo = "http://10.10.17.119/apiTiempo";
const urlUsers = "http://10.10.17.119/apiUsers";
//const url = "http://localhost:5000";

window.urlTiempo = urlTiempo;
window.urlUsers = urlUsers;
function IniciarSes() {
    let usu = $("#inpUsuario").val();
    let cont = $("#inpContraseña").val();

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
            if (e.message != "Username or password is incorrect") {
                localStorage.setItem("Key", JSON.stringify(e.token))
                localStorage.setItem("Sesion", "true")
                $(".dLogin").hide();
                $("#SesionIniciada").show();
                $(".inicioPanel").hide();
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