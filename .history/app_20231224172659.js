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
      wireframes: false,
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

var lastTime = 0,
scaleRate = 3.5;

imageElements.forEach((imageElem) => {
    const randomLeft = Math.floor(Math.random() * window.innerWidth);
    const randomTop = Math.floor(Math.random() * window.innerHeight);
    const iBody = Bodies.rectangle(
        randomLeft,
        randomTop,
        9,
        5,
      {
        render: { fillStyle: "transparent" }
      }
     );

     Events.on(engine, 'beforeUpdate', function(event) {
        var timeScale = (event.delta || (1000 / 60)) / 1000;

        if (scaleRate > 0) {
            Body.scale(iBody, 1 + (scaleRate * timeScale), 1 + (scaleRate * timeScale));
        }

        if (engine.timing.timestamp - lastTime >= 1000) {

            // stop scaling
            scaleRate = 0;
            
            // update last time
            lastTime = engine.timing.timestamp;
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

imageBodies.forEach(({ iBody, imageElem }) => {
    const { x, y } = iBody.position;
    imageElem.style.top = `${y - imageElem.offsetHeight / 2}px`;
    imageElem.style.left = `${x - imageElem.offsetWidth / 2}px`;
    imageElem.style.width = `${iBody.offsetWidth}px`;
    imageElem.style.height = `${iBody.offsetWidth}px`;
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