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
    }

    // create new Generations
    self.generate = function () {
        let roulet = [];
        let newPopulation = [];

        roulet = Selection(self.target);
        self.fitnessAverage = calcFitnessAverage(self.population);
        self.bestIndividual = getTheBestIndividual(self.population);

        if (checkIfProblemWasSolved(self.target, self.bestIndividual, self.targetFitness))
            return true;

        newPopulation = Reprodution(roulet, self.population, self.genotypeLenght);
        newPopulation = mutation(newPopulation, self.mutationRate);
        self.population = newPopulation;
        incrementGeneration();

        return false;
    }

    function checkIfProblemWasSolved(target, individual, targetFitness) {
        let assert = 0;
        for (i = 0; i < individual.genotype.length; i++) {
            if (target[i] == individual.genotype[i])
                assert++;
        }

        return (assert / target.length) >= targetFitness;
    }

    function getTheBestIndividual(population) {
        let bestFitness = -1;
        let bestIndex = -1;
        for (let i = 0; i < population.length; i++) {
            if (population[i].fitness > bestFitness) {
                bestIndex = i;
                bestFitness = population[i].fitness;
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
        fitnessArray = calculateFitnessForThePopulation(self.population, self.target);

        // 2 - create a "roulet" based in the force of the individual
        for (let i = 0; i < self.population.length; i++) {
            individualProbability = Math.round(fitnessArray[i] * 100);
            for (let j = 0; j < individualProbability; j++) {
                roulet.push(self.population[i]);
            }
        }
        return roulet;
    }

    function calculateFitnessForThePopulation(population, target) {
        let fitnessTotal = 0;
        let fitnessArray = [];

        for (let i = 0; i < population.length; i++) {
            individualFitness = calcFitness(self.population[i], target);
            fitnessArray[i] = individualFitness;
            fitnessTotal += individualFitness;
            population[i].fitness = individualFitness / target.length;
        }

        // calc fitness from everyone
        for (let i = 0; i < population.length; i++) {
            individualFitness = fitnessArray[i];
            fitnessArray[i] = fitnessArray[i] / target.length;
        }

        return fitnessArray;
    }

    function calcFitness(Individual, target) {
        let fitness = 0;
        let genotype = Individual.genotype;

        for (let i = 0; i < target.length; i++) {
            if (genotype[i] === target[i])
                fitness++;
        }
        return Math.pow(fitness, 2);
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
            if (roulet.length > 0) {
                let randA = getRandomInt(0, roulet.length);
                let randB = getRandomInt(0, roulet.length);
                parentA = roulet[randA];
                parentB = roulet[randB];
                newPopulation.push(doIndividualsCrossing(parentA, parentB, genotypeLenght));
            }
        }

        return newPopulation;
    }

    function doIndividualsCrossing(parentA, parentB, genotypeLenght) {

        let totalGenesOfParentA = getRandomInt(1, genotypeLenght) //Math.round(genotypeLenght / 2);
        let totalGenesOfParentB = genotypeLenght - totalGenesOfParentA;

        let parentAGenotype = getRandomGenesFromIndividual(parentA, totalGenesOfParentA);
        let parentBGenotype = getRandomGenesFromIndividual(parentB, totalGenesOfParentB);
        let crossedGenotype = doGenotypeCrossing(parentAGenotype, parentBGenotype);
        let child = new Individual(crossedGenotype);

        return child;
    }

    function getRandomGenesFromIndividual(individual, totalOfGenes) {
        let isFromTheLeftOfGenotype = Math.floor(Math.round(Math.random())) == 1;
        let genes = "";

        genes = individual.getGenotypePart(totalOfGenes, isFromTheLeftOfGenotype);
        return genes;

    }



    function doGenotypeCrossing(genotypeA, genotypeB) {
        return genotypeA + genotypeB;
    }

    // - Principle 4: Mutation
    function mutation(population, mutationRate) {

        let totalElementsToMutate = Math.floor(mutationRate * population.length);
        let randomIndex = 0;
        let mutationProb = 0.5;

        for (let i = 0; i < totalElementsToMutate; i++) {
            randomIndex = getRandomInt(0, population.length);
            population[randomIndex].mutate(mutationProb);
        }
        return population;
    }








    //SUPPORT
    function incrementGeneration() {
        self.generation++;
    }

    function getRandomInt(min = 0, max = 0) {
        let ret = random(min, max);
        return floor(ret);//Math.floor(Math.random() * (max - min + 1)) + min;
    }


}