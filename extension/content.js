window.addEventListener("mousedown", onMouseDown)

function onMouseDown(event){
  
  var currenttarget = event.target;
  console.log(currenttarget.src);
}