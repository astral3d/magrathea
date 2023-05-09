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
            const composite = builder.at(5000, 5000);
            const prime = builder.at(13, 7);
            //console.log(composite, prime)
            console.log(composite.society.socialState, prime.society.socialState)
        });
    });
});
