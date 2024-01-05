const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
      console.log(entry)
      if (entry.isIntersecting) {
          entry.target.classList.add('show');
      } 
  });
});

const hiddenElements = document.querySelectorAll('.reveal');
hiddenElements.forEach((el) => observer.observe(el));

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

window.addEventListener("scroll", setScrollVar)
window.addEventListener ("resize", setScrollVar)

function setScrollVar() {
  const footerElement = document.querySelector(".footer"); // Use querySelector to get a single element
  const htmlElement = document.documentElement;
  
  // Calculate the percentage of screen height scrolled
  const percentOfScreenHeightScrolled = (htmlElement.scrollTop / (htmlElement.scrollHeight - htmlElement.clientHeight) * 100);

  // Set the --scroll custom property
  htmlElement.style.setProperty("--viewportHeight", htmlElement.scrollHeight);

  // Set the --scroll custom property
  htmlElement.style.setProperty("--scroll", Math.max(percentOfScreenHeightScrolled, 0));

  // Set the --footerHeight custom property (assuming footerHeight is a variable)
  const footerHeight = footerElement.getBoundingClientRect().height;
  htmlElement.style.setProperty("--footerHeight", Math.max((htmlElement.scrollHeight - footerHeight) / htmlElement.scrollHeight) * 100);

  //console.log(footerElement.getBoundingClientRect().height)
  console.log(htmlElement.clientHeight + "px")
}


setScrollVar()