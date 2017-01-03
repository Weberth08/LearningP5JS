// for red, green, and blue color values
var r, g, b;
var population;
var solutionFuond = false;
function setup() {
  createCanvas(window.innerWidth, window.innerWidth);
  // Pick colors randomly
  let target = "Te";
  let totalPopulation = 3;
  let mutationRate = 0.0;
  let targetFitness = 1;

  population = new Population();
  population.initialize(target, totalPopulation, mutationRate,targetFitness)

}

function draw() {
  background(0);
  printPopulation(population.population);
  printInformation(population);

 if(!solutionFuond)
 solutionFuond =  population.generate();

}

function printPopulation(population) {
  let textLengh = 22;
  textSize(textLengh);
  fill(0, 102, 153);
  for (let i = 0; i < population.length; i++) {
    text(population[i].genotype, width / 2, textLengh * (i+2));
  }

}

function printInformation(population) {
  let tSize = 22;
  textSize(tSize);
  fill(0, 102, 153);

  text("Target: " + population.target, 20, tSize * 1);
  text("Generation: " + population.generation, 20, tSize * 2);
  text("Fitness Average: " + population.fitnessAverage, 20, tSize * 3);
  text("targetFitness: " + population.targetFitness, 20, tSize * 4);
  text("Mutation Rate: " + population.mutationRate, 20, tSize * 5);
  text("Population Size: " + population.totalPopulation, 20, tSize * 6);
  text("Best Individual: " + population.bestIndividual.genotype, 20, tSize * 8);


}
