var images = document.getElementsByClassName('pg-img-cover');
images = [].slice.call(images);

console.log(images);

images.forEach(function(item){

item.onclick = function GFG_Fun() {
    console.log(e.currentTarget.id, ' was clicked')
    }
})