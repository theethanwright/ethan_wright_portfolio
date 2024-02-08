var dots = document.querySelectorAll(".preview_img_link");

for(var i = 0; i < dots.length; i ++){
dots[i].dotIndex = i;
dots[i].addEventListener("click", function(){
  var a = this.dotIndex;
  console.log(this.dotIndex);
  document.getElementById(a).classList.remove("overflow-hidden");
  document.getElementById(a).style.display = `fixed`;
  document.getElementById(a).style.width = `1vw`;
  document.getElementById(a).style.height = `1vw`;
  var imgElements = document.getElementsByTagName('img');

// Loop through each img element
for (var i = 0; i < imgElements.length; i++) {
    // Remove the class from each img element
    imgElements[i].classList.remove("hover:scale-125");
}
})
}

function delay (URL) {
  setTimeout( function() { window.location = URL }, 10000 );
}
