/* global describe:false */
import { chai } from '@environment-safe/chai';
import { it } from '@open-automaton/moka';
import { World, Biome } from '../src/index.mjs';
import { Grassland } from './biomes/grassland.mjs';
import { Forest } from './biomes/forest.mjs';
const should = chai.should();

const seed = 'this-is-a-test-seed';

describe('module', ()=>{
    describe('performs a simple test suite', ()=>{
        it('expected objects are present', async ()=>{
            should.exist(World);
            should.exist(Biome);
        });
        
        it('simple example is deterministic', ()=>{
            const builder = new World({
                seed: seed,
                context
            });
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
            prime.properties.density.should.equal('subsistence');
            prime.properties.utility.should.equal('residential');
        });
    });
});

const context = {
    density : [
        { name:"unspoiled", enables: ["utility:unused", "utility:public"] },
        { name:"uninhabited", enables: ["utility:unused", "utility:public", "utility:abandoned", "utility:planning"] },
        { name:"ranged", enables: ["utility:unused", "utility:public", "utility:abandoned", "utility:planning", "utility:public"] },
        { name:"subsistence", enables: ["utility:unused", "utility:public", "utility:abandoned", "utility:planning", "utility:public", "utility:residential"] },
        { name:"rural", enables: ["utility:*"], disables:["utility:planning", "utility:industrial"] },
        { name:"town", enables: ["utility:*"], disables:["utility:planning"] },
        { name:"suburban", enables: ["utility:*"] },
        { name:"city", enables: ["utility:*"] },
        { name:"metropolis", enables: ["utility:*"], disables:["utility:unused"] }
    ],
    utility : [
        { name:"industrial", weight: 10},
        { name:"commercial", weight: 10 },
        { name:"infrastructure", weight: 10 },
        { name:"administration", weight: 10 },
        { name:"residential", weight: 30 },
        { name:"public", weight: 10},
        { name:"planning", weight: 10},
        { name:"abandoned", weight: 5},
        { name:"public", weight: 10},
    ],
    transactions : [
        { name:"currency", weight: 10, enables: ["ownership:*"]},
        { name:"barter", weight: 10, enables: ["ownership:*"]},
        { name:"commodity", weight: 10, enables: ["ownership:*"]},
        { name:"karma", weight: 10, enables: ["ownership:*"]},
        { name:"need", weight: 10, enables: ["ownership:*"]},
        { name:"no-ownership", weight: 10, enables: ["ownership:no-ownership"]},
    ],
    ownership : [
        { name:"public", weight: 10 },
        { name:"individual", weight: 10 },
        { name:"profit-group", weight: 10 },
        { name:"interest-group", weight: 10 },
        { name:"shareholders", weight: 10 },
        { name:"family", weight: 10 },
        { name:"trust", weight: 10 },
        { name:"no-ownership", weight: 10 },
    ],
    society : [
        { name:"tribal", enables:["density:*", "transactions:*", "condition:*"], disables:["density:rural", "density:town", "density:city", "density:metropolis", "transactions:currency"], weight: 10},
        { name:"agricultural", enables:["density:*", "transactions:*", "condition:*"], disables:["density:city", "density:metropolis", "ownership:shareholders"], weight: 10, requires : { age: {$gt: 10000} }},
        { name:"industrial", enables:["density:*", "transactions:*"], disables:["density:metropolis"], weight: 10, requires : { age: {$gt: 15000} }},
        { name:"solar", enables:["density:*"], weight: 10, requires : { age: {$gt: 16000} }},
        { name:"interstellar", enables:["density:*", "transactions:*", "condition:*"], weight: 10, requires : { age: {$gt: 20000} }},
        { name:"post-scarcity", enables:["density:*", "transactions:*", "condition:*"], weight: 10, requires : { age: {$gt: 30000} }},
        { name:"actualizing", enables:["density:*", "transactions:*", "condition:*"], weight: 10, requires : { age: {$gt: 40000} }},
        { name:"noncorporeal", enables:["density:*", "transactions:*", "condition:*"], weight: 10, requires : { age: {$gt: 50000} }},
    ],
    condition : [
        { name:"fledgling", weight: 10},
        { name:"growth", weight: 10, requires : { age: {$gt: 10000} }},
        { name:"peak", weight: 10, requires : { age: {$gt: 2000} }},
        { name:"decay", weight: 10, requires : { age: {$gt: 3000} }},
        { name:"ruins", weight: 10, requires : { age: {$gt: 4000} }}
    ]
};