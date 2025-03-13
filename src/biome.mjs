import { Random } from '@environment-safe/random';
export class Biome{
    constructor(options={}){
        this.options = options;
        if(options.random){
            this.random = options.random;
        }else{
            const seed = options.seed || options.name || 
                (Math.floor(Math.random()*10000000)+'');
            console.log('biome seed', seed, options);
            this.random = new Random({ seed });
        }
        this.name = options.name;
    }
    
    voxels(x, y, world, instance){
        if(!this._voxels){
            this._voxels = (new Array(x * y)).fill(0);
        }
        return this._voxels;
    }
    
    markers(x, y, world, instance){
        if(!this._markers){
            this._markers = [
                ...this.npcs(x, y, world, instance), 
                ...this.scenery(x, y, world, instance)
            ];
        }
        return this._markers;
    }
    
    //stateless
    npcs(x, y, world, instance){
        return [];
    }
    
    //stateless
    scenery(x, y, world, instance){
        return [];
    }
    
}