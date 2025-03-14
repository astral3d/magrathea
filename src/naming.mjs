import { Random } from '@environment-safe/random';
const makeWord = (count, syllables, random)=>{
    let lcv =0;
    let result = '';
    for(;lcv < count; lcv++){
        result += random.array(syllables);
    }
    return result;
}

export class Nomenclature{
    constructor(name, chunks){
        this.name = name;
        this.chunks = chunks;
        if(!chunks.length) throw new Error('no langauge parts provided!');
        this.random = new Random(name);
        const partitionSize = Math.floor(chunks.length/3);
        this.formal = chunks.slice(0, partitionSize);
        this.informal = chunks.slice(partitionSize, partitionSize*2);
        this.archaic = chunks.slice(partitionSize*2);
        this.surname = this.formal.concat(this.archaic);
        this.business = this.archaic;
        this.firstName = this.informal.concat(this.formal);
    }
    
    createProperName(surname=this.createSurname()){
        const syllableCount = 2 + this.random.integer(2);
        const names = [];
        names.push(this.createFirstName());
        let stillWorking = random.ratio() > 0.5/names.length;
        while(stillWorking){
            if(random.ratio() > 0.5){
                names.push(this.createSurname());
            }else{
                names.push(this.createFirstName());
            }
        }
        names.push(surname);
        //todo: make ordering based on society
        return names.join()
    }
    
    createFirstName(surname){
        const syllableCount = 1+this.random.integer(5);
        const name =  (
            new Array(syllableCount)
        ).fill('').map(()=>{
            return this.random.array(this.firstName);
        }).join('');
        return name;
    }
    
    createSurname(){
        const syllableCount = 1+this.random.integer(5);
        const name =  (
            new Array(syllableCount)
        ).fill('').map(()=>{
            return this.random.array(this.surname);
        }).join('');
        return name;
    }
    
    createBusinessName(owner){
        return this.createSurname();
    }
    
    createTitle(owner){
        return this.createSurname();
    }
    
    
}