function Individual(genotype) {

    let self = this;

    self.genotype = genotype;
    self.fitness = 0;

    self.getGenotypePart = function (totalOfGenes) {
        let genotypePart = "";

        if (totalOfGenes > 0) {
            let index = 0;//random(self.genotype.lenght - totalOfGenes);
            genotypePart = self.genotype.slice(index, totalOfGenes);
        }
        return genotypePart;

    }

    self.mutate = function (mutationRate = 0) {

        if (mutationRate > 0) {
            let util = new Util();
            let randomNewGene = util.generateRandomGenotype(mutationRate);
            let genesToReplace = self.getGenotypePart(mutationRate);
            self.genotype = self.genotype.replace(genesToReplace, randomNewGene);
        }

    }



}