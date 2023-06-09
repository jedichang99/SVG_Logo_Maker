const fs = require("fs");
const readline = require("readline");
const svg = require("svg");

function createLogo(text, textColor, shape, shapeColor) {
  const width = 300;
  const height = 200;

  const canvas = svg(width, height);
  canvas.rect(0, 0, width, height, { fill: shapeColor });

  let shapeElement;
  switch (shape) {
    case "circle":
      shapeElement = canvas.circle(width / 2, height / 2, 50, {
        fill: textColor,
      });
      break;
    case "triangle":
      shapeElement = canvas.polygon(
        [
          [width / 2, height / 2 - 50],
          [width / 2 - 50, height / 2 + 50],
          [width / 2 + 50, height / 2 + 50],
        ],
        { fill: textColor }
      );
      break;
    case "square":
      shapeElement = canvas.rect(width / 2 - 50, height / 2 - 50, 100, 100, {
        fill: textColor,
      });
      break;
    default:
      console.log("Invalid shape");
      return;
  }

  shapeElement.text(text, {
    x: width / 2,
    y: height / 2 + 10,
    fill: "white",
    "text-anchor": "middle",
  });

  const logoSvg = canvas.toSVG();
  fs.writeFileSync("logo.svg", logoSvg);
  console.log("Generated logo.svg");
}

function promptUser(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function main() {
  const text = await promptUser("Enter up to three characters: ");
  const textColor = await promptUser(
    "Enter the text color keyword or hexadecimal number: "
  );
  const shape = await promptUser("Choose a shape (circle, triangle, square): ");
  const shapeColor = await promptUser(
    "Enter the shape color keyword or hexadecimal number: "
  );

  createLogo(text.slice(0, 3), textColor, shape, shapeColor);
}

main();
