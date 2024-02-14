var dots = document.querySelectorAll(".preview_img_link");

for(var i = 0; i < dots.length; i ++){
dots[i].dotIndex = i;
dots[i].addEventListener("click", function(){
  console.log(this.dotIndex)
  var a = this.dotIndex;
  console.log(this.dotIndex);
  document.getElementById(a).classList.remove("overflow-hidden");
  document.getElementById(a).style.position = "rleative";
  document.getElementById(a).style.width = `100vw`;
  document.getElementById(a).style.height = `100vh`;
  document.getElementById(a).style.top = `-10%`;
  document.getElementById(a).style.left = `-10%`;
  var imgElements = document.getElementsByTagName('img');

// Loop through each img element
for (var i = 0; i < imgElements.length; i++) {
    // Remove the class from each img element
    imgElements[i].classList.remove("hover:scale-125", "transition-transform", "duration-500");
}
})
}

function delay (URL) {
  setTimeout( function() { window.location = URL }, 600 );
}
