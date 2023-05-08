import { Random } from 'random-seed-class';
import { Grid } from 'prime-intersection-grid';

const generateSyllables = (count, random, consonants='bcdfghjklmnpqrstvwxyz'.split(''), vowels='aeiouy'.split(''))=>{
    lcv=0;
    const results = [];
    let ratio = null;
    for(;lcv<count; lcv++){
        ratio = random.ratio();
        if(ratio > 0.95){
            results.push(random.array(vowels)+random.array(vowels));
        }else{
            if(ratio > 0.7){
                results.push(random.array(consonants)+random.array(vowels)+random.array(consonants));
            }else{
                results.push(random.array(consonants)+random.array(vowels));
            }
        }
    }
    return results;
}

export class World{
    static let prefix = '';
    constructor(options){
        this.name = World.prefix + (options.seed || 'default-world');
        this.random = new Random(this.name);
        this.max = options.max || {};
        if(!this.max.societies) this.max.societies = 10;
        if(!this.max.groupsPerSociety) this.max.groupsPerSociety = 10;
        if(!this.max.societies) this.max.societies = 10;
        this.syllables = generateSyllables(150);
        this.societies = [];
        let lcv=0;
        for(;lcv < this.max.societies; lcv++){
            this.societies.push(new Society({
                syllables : this.syllables,
                random: this.random
            }))
        }
        this.grid = new Grid({
            map: true,
            origins: [
                [0, 0, 0],
                [
                    random.integer(2000)-1000, 
                    random.integer(2000)-1000, 
                    random.integer(2000)-1000
                ]
            ]
        });
        this.biomes = []
    }
    
    at(x, y){
        //this function uses it's own seed to prevent state pollution
        const random = new Random(`${this.name}-${x}-${y}`);
        const positionalProperties = this.grid.cell(x, y);
        const biomes = this.biomes.filter(sift(positionalProperties))
    }
    
    addBiome(context, biome){
        this.biomes.push({
            context,
            biome
        })
    }
    
    
}