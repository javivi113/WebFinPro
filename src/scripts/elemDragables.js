//Los iconos de los parametros (tiempo, temperatura,...) 
//son movibles.
$(".iconoDragabble").draggable({
    //Los iconos se clonaran para que se mantengan en el bloque
    helper: "clone",
    //se le cambia el cursor y aparece la manita
    cursor: "grabbing",
    //ponemos el cursor en la poscion 0 0
    cursorAt: {
        x: 0,
        y: 0
    },
    //Los iconos no podran salir de div con esta id
    containment: "#dDragMovible",
    //Cuando se suelte el icono 
    //devolvera el color blanco al div de las balizas
    //Y el cursor volvera a ser la flecha
    stop: function () {
        cursor: pointer
        $(".dDatoParam3").css("border", "none")
            .css("background-color", "white");
        $(".balizasGuardada").css("background-color", "white")
    },
    //Cuando se empieza el movimiento el div se pondra de color amarillo
    start: function () {
        $(".balizasGuardada").css("background-color", "lightyellow");
    }
});
//Funcion para crear el div de las balizas que se puede droppear un elemento
function paramDrop() {
    $(".dropAqui").droppable({
        // al soltar un elemento aqui
        // muestra el elemento oculto (el parametro Tiempo, Temperatura,...)
        //Luego guarda el nuevo dato en el local storage en su respectivo lugar
        drop: function (event, ui) {
            var sParam = $(ui.draggable).attr("value");
            var loc = $(this).attr("value");
            $(`#dDat${sParam}${loc}`).show();
            let valGuardados = JSON.parse(localStorage.getItem("balizasGuardadas"));
            let i = 0;
            let pos = 0;
            let param = posParametro(sParam);
            valGuardados.forEach(a => {
                if (a[0] == loc) {
                    pos = i;
                }
                i++;
            });
            valGuardados[pos][param]=sParam;
            localStorage.setItem("balizasGuardadas", JSON.stringify([...valGuardados]));
        }
    });
    // Las balizas pueden arrastrarse aqui para ser eliminados
    $("#dBasura").droppable({
        // Define que lo que quieres soltar aqui esta en el puntero del raton
        tolerance: "pointer",
        //mientras lo tienes arrastrado el div de la papelera se marcara de un gris 
        over: function (event, ui) {
            $("#dBasura").css("margin", "2px")
                .css("border-radius", "10px")
                .css("background-color", "lightgrey");
        },
        //Cuando sueltas el raton, devuelve el estado original
        out: function (event, ui) {
            $("#dBasura").css("margin", "0px")
                .css("border-radius", "0px")
                .css("background-color", "white");
        },
        //Cuando sueltas aqui, con el id lo elimina 
        drop: function (event, ui) {
            $(ui.draggable).remove();
            delBaliza($(ui.draggable).attr("value"));
        }
    });
}
//Funcion para crear los bloques de las balizas draggabeables
function crearBloqueDraggable() {
    $(".balizasGuardada").draggable({
        // Cuando sueltas vuelve a su posicion en 150ms
        revert: true,
        revertDuration: 150,
        // El elemeto mientras es draggeado sera transparente
        opacity: 0.75,
        // se clonara
        helper: "clone",
        // se le cambia el puntero
        cursor: "grabbing",
        // se le ajusta la posicion en 1 1
        cursorAt: {
            x: 1,
            y: 1
        },
        // al arrastrar se mostrara el icono de la basura
        start: function (event, ui) {
            $("#iBasura").show();
        },
        // al soltar se ocultara el icono de la basura
        stop: function (event, ui) {
            $("#iBasura").hide();
        }
    });
    // Los parametros de los iconos los se haceb droppables
    /*$(".dDropable").droppable({
        drop: function (event, ui) {
            $(this).append(ui.draggable.removeClass("dDropable").addClass("iconoPanel"));
            $(this).removeClass("dDropable");
            document.getElementById("dRDatos").innerHTML = `<div id="" class="col-sm-3">
            <i id="" class="bi bi-droplet iconoDragabble" value="Precipitacion"></i>
        </div>
        <div id="" class="col-sm-3">
            <i id="" class="bi bi-thermometer iconoDragabble" value="Temperatura"></i>
        </div>
        <div id="" class="col-sm-3">
            <i id=""class="bi bi-wind iconoDragabble" value="Velocidad_del_viento"></i>
        </div>
        <div id="" class="col-sm-3">
            <i id=""class="bi bi-moisture iconoDragabble" value="Humedad"></i>
        </div>`
            $(".iconoDragabble").draggable({
                revert: true,
                revertDuration: 200,
                helper: "clone",
                cursor: "grabbing",
                cursorAt: {
                    x: 0,
                    y: 0
                },
                containment: "#dDragMovible",
                stop: function () {
                    cursor: pointer
                    // $(".dDatoParam3").css("border", "none")
                    // .css("background-color", "white");;

                    // $(".balizasGuardada").css("background-color", "white")
                },
                start: function () {
                    $(".dDatoParam3").css("border", "1px dashed black")
                        .css("height", "50px")
                        .css("width", "50px")
                        .css("margin", "auto")
                        .css("background-color", "yellow");
                    $(".balizasGuardada").css("background-color", "lightyellow")

                }
            });

        }
    })*/

}
