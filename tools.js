

function init_module_tools(draw_stuff) {

    var BUTTON_RADIUS = 10;
    
    var canvas = document.getElementById("main_canvas"),
        context = canvas.getContext("2d"),
        demo = document.getElementById("demo_canvas"),
        demo_context = demo.getContext("2d"),
        radius = 10;
        
    var latter_x, latter_y;
    
    
    function buttons() {
        
        var 
        size = document.getElementById("rubber"),
        x =  size.width/2,
        y =  size.height/2;
        
        for( var tool in tools ) {
            var
            button = document.getElementById(tool),
            ctx = button.getContext("2d");
            
            ctx.clearRect(0, 0, button.width, button.height);
            
            switch(tool) {
                case "rubber":
                    ctx.fillStyle = "rgba(255,255,255,1)";
                    ctx.fillRect(x-BUTTON_RADIUS, y-BUTTON_RADIUS, 
                                 2*BUTTON_RADIUS, 2*BUTTON_RADIUS);
                    ctx.strokeStyle = "rgba(0,0,0,1)";
                    ctx.strokeRect(x-BUTTON_RADIUS, y-BUTTON_RADIUS, 
                                   2*BUTTON_RADIUS, 2*BUTTON_RADIUS);
                    break;
                    
                case "brush":
                    ctx.beginPath();
                    ctx.arc(x, y, BUTTON_RADIUS, 0, 2*Math.PI);
                    ctx.fill();
                    break;
                    
                case "marker":
                    ctx.beginPath();
                    ctx.moveTo(x + BUTTON_RADIUS/3, y - BUTTON_RADIUS/3);
                    ctx.lineTo(x - BUTTON_RADIUS/3, y + BUTTON_RADIUS/3);
                    ctx.stroke();
                    break;
                    
                case "pen":
                    ctx.fillRect(x-BUTTON_RADIUS,y-BUTTON_RADIUS, 2*BUTTON_RADIUS, 2*BUTTON_RADIUS);
                    break;
                    
                    
            }
        } 
        
        
    }
    

    function rubber(click) {

        var x = document.body.scrollLeft + click.clientX;
        var y = document.body.scrollTop + click.clientY;

        context.clearRect(x-radius,y-radius, 2*radius, 2*radius);

    }

    function brush(click) {  

        var x = document.body.scrollLeft + click.clientX;
        var y = document.body.scrollTop + click.clientY;

        latter_x = x;
        latter_y = y;

        context.beginPath();
        context.arc(x, y, radius, 0, 2*Math.PI);
        context.fill();

    }

    function marker(click) {    

        var x = document.body.scrollLeft + click.clientX;
        var y = document.body.scrollTop + click.clientY;

        latter_x = x;
        latter_y = y;

        context.beginPath();
        context.moveTo(x + radius/3, y - radius/3);
        context.lineTo(x - radius/3, y + radius/3);
        context.stroke();

    }

    function pen(click) {

        var x = document.body.scrollLeft + click.clientX;
        var y = document.body.scrollTop + click.clientY;

        latter_x = x;
        latter_y = y;

        context.fillRect(x-radius,y-radius, 2*radius, 2*radius);
    }


    function brushDragged(click) {

        var x = document.body.scrollLeft + click.clientX;
        var y = document.body.scrollTop + click.clientY;


        var line = context.lineWidth;
        context.lineWidth = 2*radius;

        context.beginPath();
        context.moveTo(latter_x, latter_y);
        context.lineTo(x, y);
        context.stroke();
        context.lineWidth = line;
        context.beginPath();
        context.arc(x, y, radius, 0, 2*Math.PI);
        context.fill();

        latter_x = x;
        latter_y = y;
    }

    function markerDragged(click) {

        var x = document.body.scrollLeft + click.clientX;
        var y = document.body.scrollTop + click.clientY;

        context.beginPath();
        context.moveTo(latter_x + radius/3, latter_y - radius/3);
        context.lineTo(latter_x - radius/3, latter_y + radius/3);
        context.lineTo(x - radius/3, y + radius/3);
        context.lineTo(x + radius/3, y - radius/3);
        context.lineTo(latter_x + radius/3, latter_y - radius/3);
        context.fill();

        latter_x = x;
        latter_y = y;

    }

    function penDragged(click) {

        var x = document.body.scrollLeft + click.clientX;
        var y = document.body.scrollTop + click.clientY;

        var a = x, b = y;

        if(latter_x > x)
        {
            var swap = latter_x;
            latter_x = x;
            x = swap;

            swap = latter_y;
            latter_y = y;
            y= swap;
        }

        var x_1, y_1,x_2, y_2,x_3, y_3,x_4, y_4;

        if(latter_y - radius >= y - radius)
        {
            x_1 = latter_x - radius;
            y_1 = latter_y - radius;
            x_2 = latter_x + radius;
            y_2 = latter_y + radius;
            x_3 = x + radius;
            y_3 = y + radius;
            x_4 = x - radius;
            y_4 = y - radius;
        }
        else
        {
            x_1 = latter_x + radius;
            y_1 = latter_y - radius;
            x_2 = latter_x - radius;
            y_2 = latter_y + radius;
            x_3 = x - radius;
            y_3 = y + radius;
            x_4 = x + radius;
            y_4 = y - radius;
        }

        context.beginPath();
        context.moveTo(x_1,y_1);
        context.lineTo(x_2,y_2);
        context.lineTo(x_3,y_3);
        context.lineTo(x_4,y_4);
        context.lineTo(x_1,y_1);
        context.fill();
        context.fillRect(x-radius,y-radius, 2*radius, 2*radius);

        latter_x = a;
        latter_y = b;
    }


    function showRubber() {

        var x =  demo.width/2;
        var y =  demo.height/2;

        demo_context.clearRect(0, 0, demo.width, demo.height);

        demo_context.fillStyle = "rgba(255,255,255,1)";
        demo_context.fillRect(x-radius, y-radius, 2*radius, 2*radius);
        demo_context.strokeStyle = "rgba(0,0,0,1)";
        demo_context.strokeRect(x-radius, y-radius, 2*radius, 2*radius);
        update();
    }
    
    function showBrush() {

        var x =  demo.width/2;
        var y =  demo.height/2;

        demo_context.clearRect(0, 0, demo.width, demo.height);

        demo_context.beginPath();
        demo_context.arc(x, y, radius, 0, 2*Math.PI);
        demo_context.fill();
    }

    function showMarker() {    

        var x =  demo.width/2;
        var y =  demo.height/2;


        context.lineWidth = radius/10;
        demo_context.lineWidth = radius/10;

        demo_context.clearRect(0, 0, demo.width, demo.height);

        demo_context.beginPath();
        demo_context.moveTo(x + radius/3, y - radius/3);
        demo_context.lineTo(x - radius/3, y + radius/3);
        demo_context.stroke();

    }

    function showPen() {

        var x =  demo.width/2;
        var y =  demo.height/2;

        demo_context.clearRect(0, 0, demo.width, demo.height);

        demo_context.fillRect(x-radius,y-radius, 2*radius, 2*radius);
    }
    
    
    var tools = {
    
        "rubber": {
            
            "mousedown": rubber, 
            "drag": rubber,
            "show": showRubber
            
        },
        "brush": {
            
            "mousedown": brush, 
            "drag": brushDragged,
            "show": showBrush
            
        },
        "marker": {

            "mousedown": marker, 
            "drag": markerDragged,
            "show": showMarker
            
        },
        "pen": {
            
            "mousedown": pen, 
            "drag": penDragged,
            "show": showPen
            
        },

    };
    
    /*
    function update() {
    
        var style = "rgb(" + color + ")";
        context.fillStyle = style;
        demo_context.fillStyle = style;
        context.strokeStyle = style;
        demo_context.strokeStyle = style;
    
    }
    */
    
    (function() {
        
        var changeRadius = function (increment) {
            if (radius <= 50 && radius >= 5) {
                radius += increment; 
                show();
            }
        }
    
        document.getElementById("plus")
        .addEventListener("click", 
            function() {
                changeRadius(1);
        });

        document.getElementById("minus")
        .addEventListener("click", 
            function() {
                changeRadius(-1);
        });
        
        
        var changeTool = function(evt) {
          
            tool_name = evt.target.id;
            tool = tools[tool_name];
            
            for (var attr in tool) {
                draw_stuff[attr] = tool[attr];
            }
            
            show();
            
        };
        
        var tools_span = document.getElementById("tools");
        
        for( var tool_name in tools) {
            var button = document.createElement("canvas");
            button.id = tool_name;
            button.height = button.width = 35;
            tools_span.appendChild(button);
            tools[tool_name]["canvas"] = button;
            tools[tool_name]["button"](); 
            
            button.addEventListener("click", changeTool);
        }
        
        
        tool = tools["brush"];
        
        for (var attr in tool) {
            draw_stuff[attr] = tool[attr];
        }
        
    })();
    
}
        
        