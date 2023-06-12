const fs = require("fs");
const readline = require("readline");
const svg = require("svg");

class LogoGenerator {
  constructor() {
    this.width = 300;
    this.height = 200;
    this.canvas = svg(this.width, this.height);
  }

  addBackground(shapeColor) {
    this.canvas.rect(0, 0, this.width, this.height, { fill: shapeColor });
  }

  addText(text, textColor) {
    this.canvas.text(text, {
      x: this.width / 2,
      y: this.height / 2 + 10,
      fill: textColor,
      "text-anchor": "middle",
    });
  }

  addShape(shape, textColor) {
    switch (shape) {
      case "circle":
        this.canvas.circle(this.width / 2, this.height / 2, 50, {
          fill: textColor,
        });
        break;
      case "triangle":
        this.canvas.polygon(
          [
            [this.width / 2, this.height / 2 - 50],
            [this.width / 2 - 50, this.height / 2 + 50],
            [this.width / 2 + 50, this.height / 2 + 50],
          ],
          { fill: textColor }
        );
        break;
      case "square":
        this.canvas.rect(this.width / 2 - 50, this.height / 2 - 50, 100, 100, {
          fill: textColor,
        });
        break;
      default:
        console.log("Invalid shape");
        return;
    }
  }

  generateLogo(text, textColor, shape, shapeColor) {
    this.addBackground(shapeColor);
    this.addShape(shape, textColor);
    this.addText(text.slice(0, 3), "white");

    const logoSvg = this.canvas.toSVG();
    fs.writeFileSync("logo.svg", logoSvg);
    console.log("Generated logo.svg");
  }
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

  const logoGenerator = new LogoGenerator();
  logoGenerator.generateLogo(text, textColor, shape, shapeColor);
}

main();
