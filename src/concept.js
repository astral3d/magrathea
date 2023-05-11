import sift from "sift";
import { Random } from 'random-seed-class';
import { Context } from './context.js';

const defineContext = (ob, name, value)=>{
    const frozen = typeof value === 'object'?Object.freeze(value):value;
    Object.defineProperty(ob, name, {
      get() { return frozen },
      set(value) {  throw new Error('Contexts are immutable') }
    });
}

export class Concept{
    static defaults = {};
    
    constructor(options={}){
        this.seed = options.seed || 'default';
    }
    
    get(incomingSeries, incomingValues={}, contexts=Concept.defaults, subselects=[]){
        const random = new Random(this.seed);
        const series = incomingSeries || Concept.defaults._;
        const available = {};
        const results = JSON.parse(JSON.stringify(incomingValues));
        available[series[0]] = contexts[series[0]].slice();
        const enable = (text)=>{
            const parts = text.split(':');
            if(parts[1] === '*'){
                available[parts[0]] = contexts[parts[0]].slice();
            }else{
                if(parts[1]){
                    if(!available[parts[0]]) available[parts[0]] = [];
                    //todo: check value
                    const foundIndex = contexts[parts[0]].findIndex((item)=> item.name === parts[1]);
                    available[parts[0]].push(contexts[parts[0]][foundIndex]);
                }
            }
        }
        const disable = (text)=>{
            const parts = text.split(':');
            if(parts[1] && available[parts[0]]){
                const foundIndex = available[parts[0]].findIndex((item)=> item.name === parts[1]);
                if(foundIndex) available[parts[0]].splice(foundIndex, 1);
            }
        }
        let found = null;
        Object.keys(results).forEach((key)=>{
            found = null;
            if(results[key] && contexts[key]){
                found = contexts[key].find((item)=>item.name === results[key]);
                if(found && found.enables) found.enables.forEach((text)=>enable(text));
                if(found && found.disables) found.disables.forEach((text)=>disable(text));
            }
        });
        series.forEach((contextName, index)=>{
            const context = available[contextName] || [];
            const subselect = subselects[index];
            let selectable = subselect?context.filter(sift(subselect)):context;
            selectable = selectable.filter((item)=>{
                if(!item) return false;
                if(item.requires) return sift(item.requires)(results);
                else return true;
            });
            const selected = random.array(selectable);
            if(!selected) return; //don't do anything
            results[contextName] = selected.name;
            if(selected.enables) selected.enables.forEach((text)=>{
                enable(text);
            });
            if(selected.disables) selected.disables.forEach((text)=>{
                disable(text);
            });
        });
        return results;
    }
}
defineContext(Concept.defaults, '_', Object.keys(Context));
defineContext(Concept.defaults, 'density', Context.density);
defineContext(Concept.defaults, 'utility', Context.utility);
defineContext(Concept.defaults, 'transactions', Context.transactions);
defineContext(Concept.defaults, 'ownership', Context.ownership);
defineContext(Concept.defaults, 'society', Context.society);
defineContext(Concept.defaults, 'condition', Context.condition);