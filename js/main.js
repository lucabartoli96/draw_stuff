

window.onload = function() {
    
    draw_stuff = {
        "color": "0 , 0, 0",
        "mousedown": null,
        "drag": null,
        "show": null
    };
    
    var log = document.getElementById("log");
    log.style = "position: fixed; left: 400px; font-size: 13pt;";
    
    var LOG = function(msg) {
        log.innerHTML += msg;
    };
    
    LOG.wipe = function() {
        log.innerHTML = "";
    }
    
    
    
    init_module_tools(draw_stuff, LOG);
    init_module_draw(draw_stuff, LOG);
};
