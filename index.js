const fs = require("fs");
const inquirer = require("inquirer");

class LogoGenerator {
  constructor() {
    this.width = 300;
    this.height = 200;
    this.svgContent = "";
  }

  generateBackground(shapeColor) {
    this.svgContent += `<rect width="${this.width}" height="${this.height}" fill="${shapeColor}" />`;
  }

  generateText(text, textColor) {
    this.svgContent += `<text x="${this.width / 2}" y="${
      this.height / 2 + 10
    }" fill="${textColor}" text-anchor="middle">${text}</text>`;
  }

  generateShape(shape, textColor) {
    switch (shape) {
      case "circle":
        this.svgContent += `<circle cx="${this.width / 2}" cy="${
          this.height / 2
        }" r="50" fill="${textColor}" stroke="black" stroke-width="5" />`;
        break;
      case "triangle":
        this.svgContent += `<polygon points="${this.width / 2},${
          this.height / 2 - 50
        } ${this.width / 2 - 50},${this.height / 2 + 50} ${
          this.width / 2 + 50
        },${
          this.height / 2 + 50
        }" fill="${textColor}" stroke="black" stroke-width="5" />`;
        break;
      case "square":
        this.svgContent += `<rect x="${this.width / 2 - 50}" y="${
          this.height / 2 - 50
        }" width="100" height="100" fill="${textColor}" stroke="black" stroke-width="5" />`;
        break;
      default:
        console.log("Invalid shape");
    }
  }

  generateLogo(text, textColor, shape, shapeColor) {
    this.generateBackground(shapeColor);
    this.generateShape(shape, textColor);
    this.generateText(text.slice(0, 3), "white");

    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${this.width}" height="${this.height}">${this.svgContent}</svg>`;
    fs.writeFileSync("logo.svg", svgContent);
    console.log("Generated logo.svg");
  }
}

async function promptUser(questions) {
  return await inquirer.prompt(questions);
}

const questions = [
  { name: "text", message: "Enter up to three characters: " },
  {
    name: "textColor",
    message: "Enter the text color keyword or hexadecimal number: ",
  },
  { name: "shape", message: "Choose a shape (circle, triangle, square): " },
  {
    name: "shapeColor",
    message: "Enter the shape color keyword or hexadecimal number: ",
  },
];

async function main() {
  const answers = await promptUser(questions);

  const logoGenerator = new LogoGenerator();
  logoGenerator.generateLogo(
    answers.text,
    answers.textColor,
    answers.shape,
    answers.shapeColor
  );
}

main();
