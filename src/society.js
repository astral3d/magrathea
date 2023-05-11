import { Random } from 'random-seed-class';
import { Nomenclature } from './naming.js';
import { Concept } from './concept.js';
export class Society{
    constructor(options={}){
        const seed = options.seed||'default';
        this.random = new Random({seed});
        const percent = 0.2 + this.random.ratio() * 0.2; //0.2 - 0.4
        if(options.syllables) this.naming = this.languageFrom(seed, options.syllables, percent);
        this.name = this.naming.createSurname();
        this.groups = [];
        const ageRatio = this.random.ratio();
        let age = this.random.ratio() * 1000;
        if(ageRatio > 0.25) age += this.random.ratio() * 10000;
        if(ageRatio > 0.50) age += this.random.ratio() * 10000;
        if(ageRatio > 0.75) age += this.random.ratio() * 10000;
        if(ageRatio > 0.90) age += this.random.ratio() * 20000;
        this.age = age;
        this.socialContext = new Concept({ seed });
        this.socialState = this.socialContext.get(['society', 'transactions', 'condition'], {age: this.age});
        const xMin = options.bounds?.x?.min || -10000;
        const xMax = options.bounds?.x?.max || 10000;
        const yMin = options.bounds?.y?.min || -10000;
        const yMax = options.bounds?.y?.max || 10000;
        this.origin = {
            x: xMin + Math.floor(this.random.ratio() * (xMax-xMin)),
            y: yMin + Math.floor(this.random.ratio() * (yMax-yMin))
        }
    }
    
    createName(){
        return this.naming.createName();
    }
    
    languageFrom(name, allSyllables, ratio=0.4){
        const inverseRatio = 1 - ratio;
        const offset = this.random.ratio() * Math.floor(allSyllables.length * inverseRatio);
        const size = Math.floor(ratio * allSyllables.length);
        return new Nomenclature(name, allSyllables.slice(offset, offset+size));
    }
}