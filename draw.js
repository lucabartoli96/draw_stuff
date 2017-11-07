

function init_module_draw(draw_stuff) {

    var 
    canvas = document.getElementById("main_canvas"),
    context = canvas.getContext("2d"),
    demo = document.getElementsByTagName("nav")[0],
    steps_index = -1,
    steps = [],
    just_cleared = true,
    dragging = false,
    canvasLeft = canvas.getBoundingClientRect().left,
    canvasTop = canvas.getBoundingClientRect().top;
    
    
    function saveStep() {
    
        var data_url = canvas.toDataURL();

        if(steps_index < steps.length - 1)

            steps = steps.slice(0, steps_index + 1);


        if(steps.length === 10)

            steps.shift();

        else

            steps_index++;

        steps.push(data_url);

        //array();
    }

    function onCanvas() {
        var img = new Image();

        img.src = steps[steps_index];

        img.onload = function () {

            context.clearRect(0,0,canvas.width, canvas.height);       
            context.drawImage(img, 0, 0);

        };

    }

    function thumbNails(image) {

        var div = document.getElementById("saved");

        var link = document.createElement("a");
        link.href = image;
        link.download = "image";


        var img = document.createElement("img");
        img.src = image;

        img.addEventListener("click" , function (evt) {

            var link = evt.target.parentElement;
            link.download = prompt("Please, enter title: ", "title...");

        });

        link.appendChild(img);
        div.appendChild(link);
    }
    
    
    function fit() {
        
        canvas.width = window.innerWidth - canvasLeft;
        canvas.height = window.innerHeight - canvasTop;
        
        onCanvas();
    }
    
    

    (function () {
        
        window.addEventListener("resize", fit);

        context = canvas.getContext("2d");

        canvas.addEventListener("mousedown", function(evt) {

            just_cleared = false;
            draw_stuff["mousedown"](evt);
            evt.target.addEventListener("mousemove", draw_stuff["drag"]);
            dragging = true;
            
            demo.setAttribute("style", "display: none");

        });

        var finish = function (evt) {

           evt.target.removeEventListener("mousemove", draw_stuff["drag"]);
           saveStep();
           dragging = false;
            
           demo.setAttribute("style", "display: auto");

        };

        canvas.addEventListener("mouseup", finish);
        canvas.addEventListener("mouseout", function(evt) { if(dragging) finish(evt);});


        document.getElementById("undo")
        .addEventListener("click", function() {

            if(steps_index > 0)
            {    
                steps_index--;                
                onCanvas();
            }

        });

        document.getElementById("redo")
        .addEventListener("click", function() {

            if(steps_index < steps.length - 1)
            {   
                steps_index++;
                onCanvas();
            }

        });

        document.getElementById("save")
        .addEventListener("click", function() {

            var image_url = canvas.toDataURL();
            thumbNails(image_url);

        });


        document.getElementById("clear")
        .addEventListener("click", function() {

            if(!just_cleared) {
                context.clearRect(0,0,canvas.width,canvas.height);
                saveStep();
                just_cleared = true;

            }
        });
        
        
        draw_stuff["show"]();
        fit();
        saveStep();
        
    })();
    
};


/*

function array()
{
    var div = document.getElementById("array");
    
    while(div.hasChildNodes())
        
        div.removeChild(div.firstChild);
    
    for(var i=0; i<steps.length; i++)
    {
        var img = document.createElement("img");
        img.width = 100;
        img.height = 100;
        img.src = steps[i];
        div.appendChild(img);
    }
}


*/

