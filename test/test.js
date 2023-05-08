import * as chai from 'chai';
const should = (chai.should?chai:window.chai).should();
import { World, Biome } from '../magrathea.js';
import { Grassland } from './demo/grassland.js';
import { Forest } from './demo/forest.js';

describe('magrathea', ()=>{
   describe('performs a simple test suite', ()=>{
        it('works as expected', ()=>{
            const builder = new World({seed: seed});
            builder.addBiome(
               {  prime : {$eq: true} }, 
               new Forest({
                  name: 'forest'
               })
            );
            builder.addBiome(
               {  "context.prime" : {$eq: true} }, 
               new Forest({
                  name: 'dense-forest'
               })
            );
            builder.addBiome(
               {  "context.composite" : {$eq: true} }, 
               new Grassland({})
            );
            const world = builder.build();
            console.log(world.at(15, 33));
        });
    });
});
