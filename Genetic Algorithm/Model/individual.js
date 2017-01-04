function Individual(genotype) {

    let self = this;

    self.genotype = genotype;
    self.fitness = 0;

    self.getGenotypePart = function (totalOfGenes, isfromTheleft = true) {

        if (isfromTheleft)
            ret = getLeftGenotypePart(totalOfGenes);
        else
            ret = getRightGenotypePart(totalOfGenes);

        return ret;
    }


    function getLeftGenotypePart(totalOfGenes) {
        let genotypePart = "";

        if (totalOfGenes > 0) {
            let index = 0;//random(self.genotype.lenght - totalOfGenes);
            genotypePart = self.genotype.slice(index, totalOfGenes);
        }
        return genotypePart;

    }

    function getRightGenotypePart(totalOfGenes) {
        let genotypePart = "";

        if (totalOfGenes > 0) {
            let index = self.genotype.length - totalOfGenes;
            genotypePart = self.genotype.slice(index, self.genotype.length);
        }
        return genotypePart;

    }

    self.mutate = function (mutationRate = 0.01) {
        let util = new Util();

        let rand = 0;
        let newGene = "";

        for (let i = 0; i < self.genotype.length; i++) {
            rand = Math.random();
            if (rand < mutationRate) {
                newGene = util.generateRandomGenotype(1);
                self.genotype = util.replaceAt(self.genotype, i, newGene);
            }
        }

    }






}