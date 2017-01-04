function Util() {
    let self = this;

    self.generateRandomGenotype = function (genotypeLenght) {
        let randomIndex = 0;
        let randomGenotype = "";
        for (let i = 0; i < genotypeLenght; i++) {
            randomIndex = self.getRandomInt(32, 128);
            randomGenotype += String.fromCharCode(randomIndex);
        }
        return randomGenotype;

    }

    self.getRandomInt = function (min = 0, max = 0) {
        let ret = random(min, max);
        return floor(round(ret));//Math.floor(Math.random() * (max - min + 1)) + min;
    }

    self.replaceAt = function(text,index, character) {
        return text.substr(0, index) + character + text.substr(index + character.length);
    }
}