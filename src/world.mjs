import { Random } from 'random-seed-class';
import { Grid } from 'prime-intersection-grid';
import { Society } from './society.mjs';
import { Context } from './context.mjs';
import sift from "sift";

const generateSyllables = (
    count, 
    random, 
    consonants='bcdfghjklmnpqrstvwxyz'.split(''), 
    vowels='aeiouy'.split('')
)=>{
    let lcv=0;
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
    static prefix = '';
    constructor(options){
        this.name = World.prefix + (options.seed || 'default-world');
        this.random = new Random(this.name);
        this.max = options.max || {};
        if(!this.max.societies) this.max.societies = 10;
        if(!this.max.groupsPerSociety) this.max.groupsPerSociety = 10;
        if(!this.max.societies) this.max.societies = 10;
        this.syllables = generateSyllables(150, this.random);
        this.societies = [];
        let lcv=0;
        let context = null;
        if(options.context){
            this.context = new Context(options.context);
            context = this.context;
        }
        let seed = null;
        for(;lcv < this.max.societies; lcv++){
            seed = this.random.string('abcdefghijklmnopqrstuvwxyz'.split(''), 10);
            this.societies.push(new Society({
                syllables : this.syllables,
                seed,
                context
            }))
        }
        this.grid = new Grid({
            map: true,
            origins: [
                [0, 0, 0],
                [
                    this.random.integer(2000)-1000, 
                    this.random.integer(2000)-1000, 
                    this.random.integer(2000)-1000
                ]
            ]
        });
        this.biomes = []
    }
    
    at(x, y){
        //this function uses it's own seed to prevent state pollution
        const seed = `${this.name}-${x}-${y}`;
        const random = new Random(seed);
        const positionalProperties = this.grid.cell(x, y);
        const biomes = this.biomes.filter((biome)=>{
            const result =  sift(biome.context)(positionalProperties);
            return result;
        });
        const selectedBiome = random.array(biomes);
        if(!selectedBiome) throw new Error('no biome available for state');
        const sortedByDistance = this.societies.slice().sort((a, b)=>{
            const aDistance = Math.sqrt( (x - a.origin.x)^2 + (y - a.origin.y)^2 );
            const bDistance = Math.sqrt( (x - b.origin.x)^2 + (y - b.origin.y)^2 );
            if(aDistance === bDistance) return 0;
            if(aDistance < bDistance) return -1;
            return 1;
        });
        const society = sortedByDistance[0];
        const influences = sortedByDistance.slice(1, random.integer(4));
        const tileProperties = society.socialContext.get(
            ['density', 'utility'], 
            society.socialState, 
            seed,
            this.context
        );
        return {
            society,
            influences,
            positional: positionalProperties,
            biome: selectedBiome.biome,
            properties: tileProperties
        }
    }
    
    addBiome(context, biome){
        this.biomes.push({
            context,
            biome
        })
    }
    
    
}