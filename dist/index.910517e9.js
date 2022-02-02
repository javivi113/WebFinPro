$(".iconoDragabble").draggable({
    helper: "clone",
    cursor: "grabbing",
    cursorAt: {
        x: 0,
        y: 0
    },
    containment: "#dDragMovible",
    stop: function() {
        $(".dDatoParam3").css("border", "none").css("background-color", "white");
        $(".balizasGuardada").css("background-color", "white");
    },
    start: function() {
        $(".balizasGuardada").css("background-color", "lightyellow");
    }
});
function paramDrop() {
    $(".dropAqui").droppable({
        drop: function(event, ui) {
            var sParam = $(ui.draggable).attr("value");
            var loc = $(this).attr("value");
            $(`#dDat${sParam}${loc}`).show();
            let valGuardados = JSON.parse(localStorage.getItem("balizasGuardadas"));
            let i = 0;
            let pos = 0;
            let param = posParametro(sParam);
            valGuardados.forEach((a)=>{
                if (a[0] == loc) pos = i;
                i++;
            });
            valGuardados[pos][param] = sParam;
            localStorage.setItem("balizasGuardadas", JSON.stringify([
                ...valGuardados
            ]));
        }
    });
    $("#dBasura").droppable({
        tolerance: "pointer",
        over: function(event, ui) {
            $("#dBasura").css("margin", "2px").css("border-radius", "10px").css("background-color", "lightgrey");
        },
        out: function(event, ui) {
            $("#dBasura").css("margin", "0px").css("border-radius", "0px").css("background-color", "white");
        },
        drop: function(event, ui) {
            $(ui.draggable).remove();
            delBaliza($(ui.draggable).attr("value"));
        }
    });
}
function crearBloqueDraggable() {
    $(".balizasGuardada").draggable({
        revert: true,
        revertDuration: 150,
        opacity: 0.75,
        helper: "clone",
        cursor: "grabbing",
        cursorAt: {
            x: 1,
            y: 1
        },
        start: function(event, ui) {
            $("#iBasura").show();
        },
        stop: function(event, ui) {
            $("#iBasura").hide();
        }
    });
    $(".dDropable").droppable({
        drop: function(event, ui) {
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
        </div>`;
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
                stop: function() {
                // $(".dDatoParam3").css("border", "none")
                // .css("background-color", "white");;
                // $(".balizasGuardada").css("background-color", "white")
                },
                start: function() {
                    $(".dDatoParam3").css("border", "1px dashed black").css("height", "50px").css("width", "50px").css("margin", "auto").css("background-color", "yellow");
                    $(".balizasGuardada").css("background-color", "lightyellow");
                }
            });
        }
    });
}

//# sourceMappingURL=index.910517e9.js.map
