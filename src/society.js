import { Random } from 'random-seed-class';
import { Nomenclature } from './naming.js';
export class Society{
    constructor(options={}){
        this.random = new Random(this.name);
        const percent = 0.2 + this.random.ratio() * 0.2; //0.2 - 0.4
        if(options.syllables) this.naming = this.languageFrom(this.name, options.syllables, percent);
        this.groups = [];
    }
    
    createName(){
        return this.naming.createName();
    }
    
    languageFrom(name, allSyllables, ratio=0.4){
        const inverseRatio = 1 - ratio;
        const offset = this.random.ratio() * Math.floor(allSyllables.length * inverseRatio);
        const size = Math.floor(ratio * allSyllables.length);
        return new Nomenclature(name, allSyllables.slice(offset, size));
    }
}