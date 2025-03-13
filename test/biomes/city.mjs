import { Biome } from '../../src/biome.mjs';
import { NPC } from '../../src/npc.mjs';

export class City extends Biome{
    npcs(x, y, world, instance){
        const numNPCs = instance.random.integer(2, 5);
        try{
            let npcs = [];
            for(let lcv=0; lcv < numNPCs; lcv++){
                npcs.push(new NPC({
                    seed: 'astral3d-npc-'+instance.random.string('01234567890abcdef', 15),
                    biome: instance
                }));
            }
            return npcs;
        }catch(ex){
            console.log('ERR', numNPCs, ex);
            return [];
        }
    }
}