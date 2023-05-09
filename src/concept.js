import sift from "sift";

export class Concept{
    static defaults = {
            // society: 'society', 'transactions', 'condition'
            // tile: 'density', 'utility', 'ownership'
        _ : ['society', 'density', 'utility', 'ownership', 'transactions', 'condition'],
        density : [
            { name:"unspoiled", enables: ["utility:unused", "utility:public"] },
            { name:"uninhabited", enables: ["utility:unused", "utility:public", "utility:abandoned", "utility:planning"] },
            { name:"ranged", enables: ["utility:unused", "utility:public", "utility:abandoned", "utility:planning", "utility:public"] },
            { name:"subsistance", enables: ["utility:unused", "utility:public", "utility:abandoned", "utility:planning", "utility:public", "utility:residential"] },
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
            { name:"solar", enables:["density:*"], weight: 10, requires : { age: {$gt: 4000} }},
            { name:"interstellar", enables:["density:*", "transactions:*", "condition:*"], weight: 10, requires : { age: {$gt: 5000} }},
            { name:"post-scarcity", enables:["density:*", "transactions:*", "condition:*"], weight: 10, requires : { age: {$gt: 10000} }},
            { name:"actualizing", enables:["density:*", "transactions:*", "condition:*"], weight: 10, requires : { age: {$gt: 6000} }},
            { name:"corporeal", enables:["density:*", "transactions:*", "condition:*"], weight: 10, requires : { age: {$gt: 7000} }},
        ],
        condition : [
            { name:"fledgling", weight: 10},
            { name:"growth", weight: 10, requires : { age: {$gt: 10000} }},
            { name:"peak", weight: 10, requires : { age: {$gt: 2000} }},
            { name:"decay", weight: 10, requires : { age: {$gt: 3000} }},
            { name:"ruins", weight: 10, requires : { age: {$gt: 4000} }}
        ],
        
    };
    
    constructor(options={}){
        this.random = options.random || new Random(options.seed || 'default');
    }
    
    get(incomingSeries, incomingValues={}, contexts=Concept.defaults, subselects=[]){
        const series = incomingSeries || Concept.defaults._;
        const available = {};
        const results = JSON.parse(JSON.stringify(incomingValues));
        available[series[0]] = contexts[series[0]];
        series.forEach((contextName, index)=>{
            const context = available[contextName] || [];
            const subselect = subselects[index];
            let selectable = subselect?context.filter(sift(subselect)):context;
            selectable = selectable.filter((item)=>{
                if(item.requires) return !sift(item.requires)(results);
                else false;
            });
            console.log(contextName, selectable);
            const selected = this.random.array(context);
            results[contextName] = selected.name;
            if(selected.enables) selected.enables.forEach((enable)=>{
                const parts = enable.split(':');
                if(parts[1] === '*'){
                    available[parts[0]] = contexts[parts[0]];
                }else{
                    if(parts[1]){
                        if(!available[parts[0]]) available[parts[0]] = [];
                        //todo: check value
                        const foundIndex = contexts[parts[0]].findIndex((item)=> item.name === parts[1]);
                        available[parts[0]].push(contexts[parts[0]][foundIndex]);
                    }
                }
            });
            if(selected.disables) selected.disables.forEach((disable)=>{
                const parts = disable.split(':');
                if(parts[1]){
                    //todo: check value
                    const foundIndex = contexts[parts[0]].findIndex((item)=> item.name === parts[1]);
                    if(foundIndex) contexts[parts[0]].splice(foundIndex, 1);
                }
            });
        });
        return results;
    }
}