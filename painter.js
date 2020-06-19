let lineBtn =document.getElementById("line") ;
let circleBtn =document.getElementById("circle") ;
let rectBtn =document.getElementById("rect") ;
let freeHandBtn =document.getElementById("freeHand") ;
let eraserBtn =document.getElementById("eraser") ;
let fillBtn =document.getElementById("fillColor") ;
let strokeBtn =document.getElementById("strokeColor") ;
let widthBtn = document.getElementById("lineWidth") ;
let tool = document.getElementById("tool")



let canvas =document.getElementById("my-canvas");
let ctx = canvas.getContext("2d") ;
let currBtn ;
let startPoint={x:0 ,y:0} ;

var canvasx = canvas.offsetLeft;
var canvasy = canvas.offsetTop;
var last_mousex = last_mousey = 0;
var mousex = mousey = 0;
var mousedown = false;

///////////////////////////////////////////////////////////////////////////////////////
document.getElementById("clear").addEventListener('click',function(e){
    currBtn = e.target.id ;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    widthBtn.value = ctx.lineWidth = 2
    strokeBtn.value = fillBtn.value =ctx.strokeStyle = ctx.fillStyle = 'black' 
    tool.innerText="None"
})

widthBtn.addEventListener('change',function(e){
    ctx.lineWidth = e.target.value ;
})

strokeBtn.addEventListener('change',function(e){
    ctx.strokeStyle = e.target.value ;
})

fillBtn.addEventListener('change',function(e){
    ctx.fillStyle = e.target.value ;
})


freeHandBtn.addEventListener('click',function(e){
    currBtn=e.target.id ;
    tool.innerText="FreeHand"
})

eraserBtn.addEventListener('click',function(e){
    currBtn=e.target.id ;
    tool.innerText="Eraser"
})

lineBtn.addEventListener('click',function(e){
    currBtn=e.target.id ;
    tool.innerText="Line"
})

circleBtn.addEventListener('click',function(e){
    currBtn=e.target.id ;
    tool.innerText="Circle"
})
rectBtn.addEventListener('click',function(e){
    currBtn=e.target.id ;
    tool.innerText="Rectangle"
})

////////////////////////////////////////////////////////////////////

canvas.addEventListener('mousedown',function(e){
    if(currBtn ==="line"){
        ctx.beginPath() ;
        ctx.moveTo(e.offsetX,e.offsetY) ;
        mousedown = true;
    }
    else if(currBtn ==="circle"){
        startPoint.x=e.offsetX
        startPoint.y=e.offsetY
        ctx.beginPath() ;
        ctx.moveTo(startPoint.x,startPoint.y) ;
        mousedown = true;
    }
    else if(currBtn ==="rect"){
        startPoint.x=e.offsetX
        startPoint.y=e.offsetY
        ctx.beginPath() ;
        mousedown = true;
    }
    else if (currBtn === "freeHand" || currBtn === "eraser"){
        last_mousex = mousex = parseInt(e.clientX-canvasx);
	    last_mousey = mousey = parseInt(e.clientY-canvasy);
        mousedown = true;
    }
})

canvas.addEventListener('mouseup',function(e){
    ctx.globalCompositeOperation = 'source-over';
    if(currBtn ==="line" && mousedown){
        ctx.lineTo(e.offsetX , e.offsetY)
        ctx.fill();
        ctx.stroke();
        mousedown = false;
    }
    else if(currBtn ==="circle" && mousedown){
        let deltaX=startPoint.x - e.offsetX
        let deltaY=startPoint.y - e.offsetY
        let radius = Math.sqrt(deltaX * deltaX + deltaY * deltaY) ;
        ctx.beginPath() ;
        ctx.arc(startPoint.x , startPoint.y , radius , 0 , Math.PI * 2) ;
        ctx.fill();
        ctx.stroke();
        mousedown = false;
    }
    else if(currBtn ==="rect" && mousedown){
        ctx.fillRect(startPoint.x,startPoint.y, e.offsetX - startPoint.x   , e.offsetY - startPoint.y  )
        ctx.strokeRect(startPoint.x,startPoint.y, e.offsetX - startPoint.x  , e.offsetY - startPoint.y )
        mousedown = false;
    }
    else if (currBtn === "freeHand" || currBtn === "eraser"){
        mousedown = false;
    }
})


canvas.addEventListener('mousemove', function(e) {
    mousex = parseInt(e.clientX-canvasx);
    mousey = parseInt(e.clientY-canvasy);
    if(mousedown && ( currBtn ==='freeHand' || currBtn ==='eraser' )) {
        ctx.beginPath();
        if(currBtn ==='freeHand') {
            ctx.globalCompositeOperation = 'source-over';
            //ctx.fill();
            ctx.stroke();
        }
        else if (currBtn ==='eraser') {
            ctx.globalCompositeOperation = 'destination-out';
        }
        ctx.moveTo(last_mousex,last_mousey);
        ctx.lineTo(mousex,mousey);
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.stroke();
    }
    last_mousex = mousex;
    last_mousey = mousey;
});
