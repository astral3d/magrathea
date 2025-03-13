/* global describe:false */
import { chai } from '@environment-safe/chai';
import { it } from '@open-automaton/moka';
import { World, Biome } from '../src/index.mjs';
import { context, setupBiome } from './biomes/simple-biomes.mjs';
import { setupPopulatedBiome } from './biomes/populated-biomes.mjs';
import { Grassland } from './biomes/grassland.mjs';
import { Forest } from './biomes/forest.mjs';
import { City } from './biomes/city.mjs';
const should = chai.should();

const seed = 'this-is-a-test-seed';

describe('module', ()=>{
    describe('performs a simple test suite', ()=>{
        it('expected objects are present', async ()=>{
            should.exist(World);
            should.exist(Biome);
        });
        
        it('composite example is deterministic', ()=>{
            const builder = new World({ seed, context });
            setupBiome(builder);
            const composite = builder.at(10000, 10000);
            should.exist(composite.society);
            should.exist(composite.biome);
            (composite.biome instanceof Grassland).should.equal(true);
            should.exist(composite.properties);
            composite.properties.age.should.equal(407.77819436825683);
            composite.properties.society.should.equal('tribal');
            composite.properties.transactions.should.equal('commodity');
            composite.properties.condition.should.equal('fledgling');
            composite.properties.density.should.equal('uninhabited');
            composite.properties.utility.should.equal('public');
            //console.log(composite);
        });
        
        it('prime example is deterministic', ()=>{
            const builder = new World({ seed, context });
            setupBiome(builder);
            const prime = builder.at(13, 7);
            should.exist(prime.society);
            should.exist(prime.biome);
            (prime.biome instanceof Forest).should.equal(true);
            should.exist(prime.properties);
            prime.properties.age.should.equal(1512.7337612769345);
            prime.properties.society.should.equal('tribal');
            prime.properties.transactions.should.equal('karma');
            prime.properties.condition.should.equal('fledgling');
            prime.properties.density.should.equal('subsistence');
            prime.properties.utility.should.equal('residential');
        });
    });
    
    describe('performs complex cases', ()=>{
        it('city can produce npcs', ()=>{
            const builder = new World({ seed, context });
            setupPopulatedBiome(builder);
            const prime = builder.at(7, 5);
            should.exist(prime.society);
            should.exist(prime.biome);
            (prime.biome instanceof City).should.equal(true);
            const markers = prime.markers();
            //console.log(markers);
        });
    });
});