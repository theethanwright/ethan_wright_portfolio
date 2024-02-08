var dots = document.querySelectorAll(".pg-img-cover");
console.log(dots)

for(var i = 0; i < dots.length; i ++){
dots[i].dotIndex = i;
dots[i].addEventListener("click", function(){
    console.log(this.dotIndex);
    var a = this.dotIndex;
    document.getElementById(a).style.display = "block"
})
};

function closeCard(a) {
    document.getElementById(a).style.display = "none";
}