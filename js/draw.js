

function init_module_draw(draw_stuff, LOG) {

    var 
    THUMBNAILS_WIDTH = 60;
    
    var 
    canvas = document.getElementById("main_canvas"),
    context = canvas.getContext("2d"),
    demo = document.getElementsByTagName("nav")[0],
    steps_index = -1,
    steps = [],
    just_cleared = true,
    dragging = false,
    save_dropdown = document.getElementById("save_dropdown"),
    canvasLeft = canvas.getBoundingClientRect().left,
    canvasTop = canvas.getBoundingClientRect().top,
    selected_image = null;
    
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
    
    function downloadURI(uri, name) {
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        delete link;
    }

    function thumbNails(image) {

        var div = document.getElementById("saved");

        var img = document.createElement("img");
        img.src = image;
        
        var ratio = img.height/img.width;
        
        img.width = THUMBNAILS_WIDTH;
        img.height = THUMBNAILS_WIDTH*ratio;
        

        if (! img.width * img.height) {
            return;
        }
        
        
        img.addEventListener("click" , function (evt) {
            
            if (selected_image) {
                selected_image.className = "";    
            }
            
            evt.target.className = "selected";
            selected_image = img;
            
        });

        div.appendChild(img);
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

        });

        var finish = function (evt) {

           evt.target.removeEventListener("mousemove", draw_stuff["drag"]);
           saveStep();
           dragging = false;

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
        
        
        document.getElementsByTagName("form")[0]
        .addEventListener("click", function(evt) {
           
            evt.preventDefault();
            
            if (selected_image) {
                var 
                URI = selected_image.href,
                input = document.getElementsByName("file_name")[0],
                name = input.value;
            
                if (value) {
                    downloadURI(URI, name);
                }
            } 
            
        });
        
        
        document.getElementById("save_dropdown_button")
        .addEventListener("click", function() {
            if (save_dropdown.style.display == "none") {
                save_dropdown.style.display = "block";
            } else {
                save_dropdown.style.display = "none";
            }
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

