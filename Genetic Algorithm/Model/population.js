function Population() {
    let self = this;
    self.target = "";
    self.totalPopulation = 0;
    self.generation = 0;
    self.genotypeLenght = 0;
    self.mutationRate = 0;
    self.targetFitness = 1;
    self.population = [];
    self.fitnessAverage = 0;
    self.bestIndividual = {};

    self.initialize = function (target = "", totalPopulation = 0, mutationRate = 0, targetFitness = 1) {
        self.target = target;
        self.mutationRate = mutationRate;
        self.totalPopulation = totalPopulation;
        self.genotypeLenght = self.target.length;
        self.targetFitness = targetFitness

        generateInitialPopulation(self.totalPopulation, self.genotypeLenght)
        console.log(self.population);
    }

    // create new Generations
    self.generate = function () {



        let roulet = [];
        let newPopulation = [];

        roulet = Selection(self.target);
        self.fitnessAverage = calcFitnessAverage(self.population);
        self.bestIndividual = getTheBestIndividual(self.population);

        if (checkIfProblemWasSolved(self.bestIndividual, self.targetFitness))
            return true;

        newPopulation = Reprodution(roulet, self.population, self.genotypeLenght);
        newPopulation = mutation(newPopulation, self.mutationRate);
        self.population = newPopulation;
        incrementGeneration();

        return false;
    }

    function checkTarget(population, targetFitness) {


        for (let i = 0; i < population.length; i++) {
            if (population[i].fitness >= targetFitness)
                return true;
        }
        return false;



    }

    function checkIfProblemWasSolved(individual,targetFitness){

        return individual.fitness >= targetFitness;

    }

    function getTheBestIndividual(population){
        let bestFitness = -1;
        let bestIndex = -1;
        for (let i = 0; i < population.length; i++) {
            if(population[i].fitness > bestFitness){
                bestIndex = i;
            }
        }

        return population[bestIndex];
    }

    // - Principle 1: Variation
    function generateInitialPopulation(totalPopulation, genotypeLenght) {
        let genotype;
        incrementGeneration();
        for (let i = 0; i < totalPopulation; i++) {
            genotype = generateRandomGenotype(genotypeLenght);
            self.population.push(new Individual(genotype));
        }
    }

    function generateRandomGenotype(genotypeLenght) {
        let util = new Util();
        let randomNewGene = util.generateRandomGenotype(genotypeLenght);
        return randomNewGene;
    }


    // - Principle 2: Selection

    function Selection(target) {
        let fitnessArray = [];
        let roulet = [];
        let individualProbability = 0;
        let newPopulation = [];

        // 1 - calc the fitness for each individual in population
        let individualFitness = 0;
        for (let i = 0; i < self.population.length; i++) {
            individualFitness = calcFitness(self.population[i], target);
            fitnessArray[i] = individualFitness;
            self.population[i].fitness = individualFitness;
        }

        // 2 - create a "roulet" based in the force of the individual
        for (let i = 0; i < self.population.length; i++) {
            individualProbability = fitnessArray[i] * 100;

            individualProbability = individualProbability > 0 ? individualProbability : 1;

            for (let j = 0; j < individualProbability; j++) {
                roulet.push(self.population[i]);
            }
        }
        return roulet;
    }

    function calcFitness(Individual, target) {
        let fitness = 0;
        let genotype = Individual.genotype;

        for (let i = 0; i < target.length; i++) {
            if (genotype[i] === target[i])
                fitness++;
        }
        return fitness / target.length;
    }

    function calcFitnessAverage(population) {
        let fitnessSum = 0;
        for (let i = 0; i < population.length; i++) {
            fitnessSum += population[i].fitness;
        }
        return fitnessSum / population.length


    }



    // - Principle 3: Reprodution
    function Reprodution(rouletOfPeople, population, genotypeLenght) {
        let roulet = rouletOfPeople;
        let populationCopy = population;
        let parentA;
        let parentB;
        let newPopulation = [];

        for (let i = 0; i < populationCopy.length; i++) {
            parentA = roulet[getRandomInt(roulet.length)];
            parentB = roulet[getRandomInt(roulet.length)];
            newPopulation.push(doIndividualsCrossing(parentA, parentB, genotypeLenght));
        }

        return newPopulation;
    }

    function doIndividualsCrossing(parentA, parentB, genotypeLenght) {

        let totalGenesOfParentA = getRandomInt(0, genotypeLenght + 1)
        let totalGenesOfParentB = genotypeLenght - totalGenesOfParentA;

        let parentAGenotype = parentA.getGenotypePart(totalGenesOfParentA);
        let parentBGenotype = parentB.getGenotypePart(totalGenesOfParentB);
        let crossedGenotype = doGenotypeCrossing(parentAGenotype, parentBGenotype);
        let child = new Individual(crossedGenotype);

        return child;

    }

    function doGenotypeCrossing(genotypeA, genotypeB) {
        return genotypeA + genotypeB;
    }

    // - Principle 4: Mutation
    function mutation(population, mutationRate) {

        let totalElementsToMutate = Math.floor(mutationRate * population.length);
        let randomIndex = 0;

        for (let i = 0; i < population.length; i++) {
            randomIndex = getRandomInt(population.length);
            population[randomIndex].mutate(1);
        }

        return population;
    }








    //SUPPORT
    function incrementGeneration() {
        self.generation++;
    }

    function getRandomInt(min = 0, max = 0) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


}