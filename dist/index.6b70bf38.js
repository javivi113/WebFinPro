function paramDrop(){$(".dropAqui").droppable({drop:function(a,r){var o=$(r.draggable).attr("value"),e=$(this).attr("value");$(`#dDat${o}${e}`).show();let t=JSON.parse(localStorage.getItem("balizasGuardadas")),s=0,c=0,n=posParametro(o);t.forEach((a=>{a[0]==e&&(c=s),s++})),t[c][n]=o,localStorage.setItem("balizasGuardadas",JSON.stringify([...t]))}}),$("#dBasura").droppable({tolerance:"pointer",over:function(a,r){$("#dBasura").css("margin","2px").css("border-radius","10px").css("background-color","lightgrey")},out:function(a,r){$("#dBasura").css("margin","0px").css("border-radius","0px").css("background-color","white")},drop:function(a,r){$(r.draggable).remove(),delBaliza($(r.draggable).attr("value"))}})}function crearBloqueDraggable(){$(".balizasGuardada").draggable({revert:!0,revertDuration:150,opacity:.75,helper:"clone",cursor:"grabbing",cursorAt:{x:1,y:1},start:function(a,r){$("#iBasura").show()},stop:function(a,r){$("#iBasura").hide()}})}$(".iconoDragabble").draggable({helper:"clone",cursor:"grabbing",cursorAt:{x:0,y:0},containment:"#dDragMovible",stop:function(){$(".dDatoParam3").css("border","none").css("background-color","white"),$(".balizasGuardada").css("background-color","white")},start:function(){$(".balizasGuardada").css("background-color","lightyellow")}});
//# sourceMappingURL=index.6b70bf38.js.map