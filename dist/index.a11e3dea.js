document.getElementById("btnInicioSesion").addEventListener("click", IniciarSes);
// document.getElementById("btnRegistrarse").addEventListener("click", registrarse);
const url = "http://localhost:4000";
window.url = url;
function IniciarSes() {
    let usu = $("#inpUsuario").val();
    let cont = $("#inpContraseña").val();
    fetch(`${url}/Users/authenticate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": usu,
            "password": cont
        })
    }).then((response)=>response.json()
    ).then((e)=>{
        if (e.message != "Username or password is incorrect") {
            localStorage.setItem("Key", JSON.stringify(e.token));
            localStorage.setItem("Sesion", "true");
            $(".dLogin").hide();
            $("#SesionIniciada").show();
            $(".inicioPanel").hide();
            $("body").css({
                "background-image": "",
                "background-position": "center",
                "background-repeat": "no-repeat",
                "background-size": "cover"
            });
            colocarMarcadores();
        } else {
            localStorage.setItem("Sesion", "false");
            alert("Usuario y/o contraseña no son correctos");
        }
    }).catch((err)=>alert("Usuario y/o contraseña no son correctos")
    );
}

//# sourceMappingURL=index.a11e3dea.js.map
