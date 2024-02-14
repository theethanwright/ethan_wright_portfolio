const canvasSize = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  const lineHeight = (window.innerWidth * 8.5) / 100;
  const displayPaddingLeft = (window.innerWidth * 9.838) / 100;
  const displayPaddingTop = (window.innerHeight * 23.903) / 100;

  const spaceBetweenWords = 20;

  const splitWords = () => {
    const textNode = document.querySelector(".text");
    const text = textNode.textContent.trim(); // Remove leading/trailing whitespace
    const words = text.split(" ");
    const lines = [
      ["CURIOSITY", "LEADING"],
      ["TO", "CREATIONS", "THAT"],
      ["FOSTER", "CARE"]
    ];

    const lineDivs = lines.map((lineWords) => {
      const spanElements = lineWords.map((word) => {
        return `<span class="word">${word}</span>`;
      });
      return `<div class="line">${spanElements.join("")}</div>`;
    });

    textNode.innerHTML = lineDivs.join("");
  };

  splitWords();

const renderCanvas = () => {
  const Engine = Matter.Engine;
  const Render = Matter.Render;
  const World = Matter.World;
  const Body = Matter.Body;
  const Events = Matter.Events;
  const Bodies = Matter.Bodies;
  const Runner = Matter.Runner;
  const Composite = Matter.Composite;
  const params = {
    isStatic: true,
    render: {
      fillStyle: "transparent"
    }
  };

  const engine = Engine.create({});

  const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      ...canvasSize,
      background: "transparent",
      wireframes: true,
    }
  });

  // walls and other configurations remain the same...
  Composite.add(engine.world, [
      // walls
      Bodies.rectangle(
          canvasSize.width / 2,
          canvasSize.height,
          canvasSize.width,
          50,
          params,
     { isStatic: true }),
      Bodies.rectangle(
          0,
          canvasSize.height / 2,
          50,
          canvasSize.height,
          params,
           { isStatic: true }),
      Bodies.rectangle(
          canvasSize.width,
          canvasSize.height / 2,
          50,
          canvasSize.height,
          params,
           { isStatic: true }),
      Bodies.rectangle(
          canvasSize.width / 2,
          0,
          canvasSize.width,
          50,
          params,
           { isStatic: true })
  ]);

const imageBodies = [];
const imageElements = document.querySelectorAll(".image");

imageElements.forEach((imageElem) => {
    const randomLeft = Math.floor(Math.random() * window.innerWidth);
    const randomTop = Math.floor(Math.random() * window.innerHeight);
    const randomTime = Math.floor(Math.random() * 2000) + 1000;
    var startTime = 0,
     scaleRate = 0;
     const scalingDuration = 200;
    const iBody = Bodies.rectangle(
        randomLeft,
        randomTop,
        1,
        1,
      {
        render: { fillStyle: "transparent" }
      }
     );

     Events.on(engine, 'beforeUpdate', function (event) {
      var timeScale = (event.delta || (1000 / 60)) / 1000;
  
      if (scaleRate > 0) {
        Body.scale(iBody, 1 + (scaleRate * timeScale), 1 + (scaleRate * timeScale));
      }
  
      if (engine.timing.timestamp - startTime >= randomTime && 
          engine.timing.timestamp - startTime <= randomTime + scalingDuration) {
        // start scaling
        scaleRate = 1.5;
  
        // update last time
        startTime = randomTime + scalingDuration;
      }
  
      if (engine.timing.timestamp - startTime >= randomTime + scalingDuration) {
        // stop scaling
        scaleRate = 0;
  
        // reset start time
        startTime = engine.timing.timestamp;
      }
    });
  

     imageBodies.push({ iBody, imageElem});

    });      


    const wordBodies = [];
    const lineDivs = document.querySelectorAll(".line");

    let currentY = displayPaddingTop; // Starting Y-coordinate for the first line
    lineDivs.forEach((lineDiv) => {
      const wordElements = lineDiv.querySelectorAll(".word");
      let currentX = displayPaddingLeft; // Starting X-coordinate for each line

      wordElements.forEach((wordElem) => {
        const width = wordElem.offsetWidth;
        const height = wordElem.offsetHeight;

        const body = Bodies.rectangle(
          currentX + width / 2,
          currentY + height / 2,
          width,
          height,
          {
            render: { fillStyle: "transparent" }
          }
        );

        wordBodies.push({ body, elem: wordElem });

        currentX += width + spaceBetweenWords;
      });

      currentY += lineHeight; // Adjust this value for vertical spacing between lines
    });

    World.add(engine.world, [
      ...wordBodies.map((box) => box.body),
      ...imageBodies.map((box) =>box.iBody),
    ]);

  engine.gravity.y = 0;

  render.options.showCollisions

  const mouse = Matter.Mouse.create(document.body);
  const mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false
      }
    }
  });
  mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
  mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

  World.add(engine.world, [
    ...wordBodies.map((box) => box.body),
    mouseConstraint
  ]);
  render.mouse = mouse;
  Runner.run(engine);
  Render.run(render);

  (function rerender() {
    wordBodies.forEach(({ body, elem }) => {
    const { x, y } = body.position;
    elem.style.top = `${y - elem.offsetHeight / 2}px`;
    elem.style.left = `${x - elem.offsetWidth / 2}px`;
    elem.style.transform = `rotate(${body.angle}rad)`;
});

  function distance(x1, y1, x2, y2){
    var x = Math.abs(x1-x2)
    var y = Math.abs(y1-y2)
    return Math.sqrt((x*x)+(y*y))
  }

imageBodies.forEach(({ iBody, imageElem }) => {
    const { x, y } = iBody.position
    const width = distance(iBody.vertices[0].x, iBody.vertices[0].y, iBody.vertices[1].x, iBody.vertices[1].y)
    imageElem.style.top = `${y - imageElem.offsetHeight / 2}px`;
    imageElem.style.left = `${x - imageElem.offsetWidth / 2}px`;
    imageElem.style.width = `${width}px`;
    imageElem.style.transform = `rotate(${iBody.angle}rad)`;
  });

Matter.Engine.update(engine);
requestAnimationFrame(rerender);
})();

};

window.addEventListener("resize", () => {
  // Update canvasSize when the window is resized
  canvasSize.width = window.innerWidth;
  canvasSize.height = window.innerHeight;

  // Rerender canvas with the updated size
  renderCanvas();
});

window.addEventListener("DOMContentLoaded", (event) => {
  splitWords();
  renderCanvas();
});