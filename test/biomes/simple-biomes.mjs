import { Grassland } from './grassland.mjs';
import { Forest } from './forest.mjs';

import { context } from './society-context.mjs';

export const setupBiome = (world)=>{
    world.addBiome(
       {  "isFullyPrime" : {$gt: 0} }, 
       new Forest({
          name: 'forest'
       })
    );
    world.addBiome(
       {  "isFullyPrime" : {$gt: 0} }, 
       new Forest({
          name: 'dense-forest'
       })
    );
    world.addBiome(
       {  "isFullyPrime" : {$eq: false} }, 
       new Grassland({
          name: 'grassland'
       })
    );
    return world;
};

export { context };