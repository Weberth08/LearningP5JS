// for red, green, and blue color values
var r, g, b;
var population;
var solutionFuond = false;
var maxGenerations = 35000;
var target = ""
function setup() {
  createCanvas(window.innerWidth, window.innerWidth);
  // Pick colors randomly
  target = "To be or not to be that is the question";
  let totalPopulation = 100;
  let mutationRate = 0.20;
  let targetFitness = 1;

  population = new Population();
  population.initialize(target, totalPopulation, mutationRate, targetFitness)

}

function draw() {
  background(0);
  printPopulation(population.population, target);
  printInformation(population, target);

  if (!solutionFuond && population.generation < maxGenerations)
    solutionFuond = population.generate();

}

function printPopulation(population, targetText) {
  let textLengh = 15;
  let red = 0, green = 0, individualFitiness = 0, totalRed = 0, totalGreen = 0;
  textSize(textLengh);


  for (let i = 0; i < population.length; i++) {
    tSize = textLengh;
    green = calcGreen(population[i], targetText);
    red = 255 - (green);

    fill(red, green, 0);
    text(population[i].genotype, width / 2, tSize * (i + 2));
  }
}

function printInformation(population, targetText) {
  let tSize = 22;
  textSize(tSize);
  fill(0, 102, 153);
  let green, red,blue;

  text("Target: " + population.target, 20, tSize * 1);
  text("Generation: " + population.generation, 20, tSize * 2);
  text("Fitness Average: " + population.fitnessAverage, 20, tSize * 3);
  text("targetFitness: " + population.targetFitness, 20, tSize * 4);
  text("Mutation Rate: " + (100 * population.mutationRate) + "%", 20, tSize * 5);
  text("Population Size: " + population.totalPopulation, 20, tSize * 6);

 
  green = calcGreen(population.bestIndividual, targetText);
  red = 255 - (green);
  blue = 0;

  fill(red, green, blue);
  textSize(tSize * 1.5);
  text("Best Individual: " + population.bestIndividual.genotype, 20, tSize * 8);


  printBar(red, green, blue)


}

function printBar(red, green, blue) {
  fill(red, green, blue);
  rect(10, 200, 400, 3);
}

function calcGreen(individual, targetText) {
  let green = 0;
  individualFitiness = sqrt(individual.fitness) / targetText.length;
  green = 255 * (individualFitiness);
  return green;
}

