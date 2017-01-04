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
        self.targetFitness = targetFitness;

        self.population = generateInitialPopulation(self.totalPopulation, self.genotypeLenght);
        self.population.forEach(function (element) {
            calcFitness(element, self.target);
        }, this);
        incrementGeneration();
    }

    // create new Generations
    self.generate = function () {

        self.population = doNaturalEvolution(self.population, self.target, self.genotypeLenght, self.mutationRate);
        incrementGeneration();
        self.fitnessAverage = calcFitnessAverage(self.population);
        self.bestIndividual = getTheBestIndividual(self.population);

        return wasTheProblemSolved(self.target, self.bestIndividual, self.targetFitness);

    }

    function doNaturalEvolution(population, target, genotypeLenght, mutationRate) {
        let newPopulation = [];
        roulette = Selection(population, target);
        newPopulation = ReprodutionAndCalculateFitness(roulette, population, target, genotypeLenght);
        mutation(newPopulation, mutationRate);

        return newPopulation;

    }

    function wasTheProblemSolved(target, individual, targetFitness) {
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
        let randomPopulation = [];
        for (let i = 0; i < totalPopulation; i++) {
            genotype = generateRandomGenotype(genotypeLenght);
            randomPopulation.push(new Individual(genotype));
        }

        return randomPopulation;
    }

    function generateRandomGenotype(genotypeLenght) {
        let util = new Util();
        let randomNewGene = util.generateRandomGenotype(genotypeLenght);
        return randomNewGene;
    }


    // - Principle 2: Selection

    function Selection(population, target) {
        let roulette = [];
        roulette = calculateFitnessForThePopulation(population, target);
        return roulette;
    }

    function calculateFitnessForThePopulation(population, target) {
        let individualFit = 0;
        let roulette = [];
        for (let i = 0; i < population.length; i++) {
            individualFit = population[i].fitness / target.length;
            individualProbability = Math.round(individualFit * 100);
            for (let j = 0; j < individualProbability; j++) {
                roulette.push(i);
            }
        }
        return roulette;
    }

    function calcFitness(individual, target) {
        return individual.calcFitness(target);

    }

    function calcFitnessAverage(population) {
        let fitnessSum = 0;
        for (let i = 0; i < population.length; i++) {
            fitnessSum += population[i].fitness;
        }
        return fitnessSum / population.length
    }



    // - Principle 3: Reprodution

    function ReprodutionAndCalculateFitness(rouletteOfPeople, population, target, genotypeLenght) {
        let child;
        let newPopulation = [];

        for (let i = 0; i < population.length; i++) {
            child = Reprodution(rouletteOfPeople, population, genotypeLenght);
            newPopulation.push(child);
            calcFitness(child, target);
        }
        return newPopulation;

    }
    function Reprodution(roulette, population, genotypeLenght) {
        let parentA, parentB, child = {};

        if (roulette.length > 0) {
            parentA = population[roulette[getRandomInt(0, roulette.length)]];
            parentB = population[roulette[getRandomInt(0, roulette.length)]];
            child = doIndividualsCrossing(parentA, parentB, genotypeLenght);
        }
        return child;
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