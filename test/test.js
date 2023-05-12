import * as chai from 'chai';
const should = (chai.should?chai:window.chai).should();
import { World, Biome } from '../magrathea.js';
import { Grassland } from './biomes/grassland.js';
import { Forest } from './biomes/forest.js';
const seed = 'this-is-a-test-seed';

describe('magrathea', ()=>{
   describe('performs a simple test suite', ()=>{
        it('works as expected', ()=>{
            const builder = new World({seed: seed});
            builder.addBiome(
               {  "isFullyPrime" : {$gt: 0} }, 
               new Forest({
                  name: 'forest'
               })
            );
            builder.addBiome(
               {  "isFullyPrime" : {$gt: 0} }, 
               new Forest({
                  name: 'dense-forest'
               })
            );
            builder.addBiome(
               {  "isFullyPrime" : {$eq: false} }, 
               new Grassland({
                  name: 'grassland'
               })
            );
            //const world = builder.build();
            const composite = builder.at(10000, 10000);
            should.exist(composite.society);
            should.exist(composite.biome);
            (composite.biome instanceof Grassland).should.equal(true);
            should.exist(composite.properties);
            composite.properties.age.should.equal(818.3496492941847);
            composite.properties.society.should.equal('tribal');
            composite.properties.transactions.should.equal('barter');
            composite.properties.condition.should.equal('fledgling');
            composite.properties.density.should.equal('uninhabited');
            composite.properties.utility.should.equal('public');
            
            const prime = builder.at(13, 7);
            should.exist(prime.society);
            should.exist(prime.biome);
            (prime.biome instanceof Forest).should.equal(true);
            should.exist(prime.properties);
            prime.properties.age.should.equal(9939.742607312288);
            prime.properties.society.should.equal('tribal');
            prime.properties.transactions.should.equal('commodity');
            prime.properties.condition.should.equal('decay');
            prime.properties.density.should.equal('subsistance');
            prime.properties.utility.should.equal('residential');
        });
    });
});
