import { Grassland } from './grassland.mjs';
import { Forest } from './forest.mjs';
import { City } from './city.mjs';

import { context } from './society-context.mjs';

export const setupPopulatedBiome = (world)=>{
    world.addBiome(
       {  "isFullyPrime" : {$gt: 1} }, 
       new City({
          name: 'city'
       })
    );
    world.addBiome(
       {  "isFullyPrime" : {$gt: 0} }, 
       new Forest({
          name: 'forest'
       })
    );
    world.addBiome(
       {  "isFullyPrime" : {$eq: 0} }, 
       new Grassland({
          name: 'grassland'
       })
    );
    return world;
};

export { context };