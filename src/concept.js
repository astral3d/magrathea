import sift from "sift";

export class Concept{
    static let defaults = {
        _ : ['density', 'utility', 'ownership', 'transactions', 'society', 'condition'],
        density : [
            { name:"unspoiled", enables: ["utility:unused", "utility:public"] },
            { name:"uninhabited", enables: ["utility:unused", "utility:public", "utility:abandoned", "utility:planning"] },
            { name:"ranged", enables: ["utility:unused", "utility:public", "utility:abandoned", "utility:planning", "utility:public"] },
            { name:"subsistance", enables: ["utility:unused", "utility:public", "utility:abandoned", "utility:planning", "utility:public", "utility:residential"] },
            { name:"rural", enables: ["utility:*"], disables:["utility:planning", "utility:industrial"] }
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
            { name:"currency", weight: 10},
            { name:"barter", weight: 10},
            { name:"commodity", weight: 10},
            { name:"karma", weight: 10},
            { name:"need", weight: 10},
            { name:"currency", weight: 10},
            { name:"no-ownership", weight: 10},
        ],
        ownership : [
            { name:"public", weight: 10, enables: ["transactions:*"], disables:["transactions:unused"]},
            { name:"individual", weight: 10},
            { name:"profit-group", weight: 10},
            { name:"interest-group", weight: 10},
            { name:"shareholders", weight: 10},
            { name:"family", weight: 10},
            { name:"trust", weight: 10},
        ],
        society : [
            { name:"tribal", weight: 10},
            { name:"agricultural", weight: 10, requires : { age: {$gt: 10000} }},
            { name:"industrial", weight: 10, requires : { age: {$gt: 15000} }},
            { name:"solar", weight: 10, requires : { age: {$gt: 4000} }},
            { name:"interstellar", weight: 10, requires : { age: {$gt: 5000} }},
            { name:"post-scarcity", weight: 10, requires : { age: {$gt: 10000} }},
            { name:"actualizing", weight: 10, requires : { age: {$gt: 6000} }},
            { name:"corporeal", weight: 10, requires : { age: {$gt: 7000} }},
        ],
        condition : [
            { name:"tribal", weight: 10},
            { name:"agricultural", weight: 10, requires : { age: {$gt: 10000} }},
            { name:"industrial", weight: 10, requires : { age: {$gt: 15000} }},
            { name:"solar", weight: 10, requires : { age: {$gt: 4000} }},
            { name:"interstellar", weight: 10, requires : { age: {$gt: 5000} }},
            { name:"post-scarcity", weight: 10, requires : { age: {$gt: 10000} }},
            { name:"actualizing", weight: 10, requires : { age: {$gt: 6000} }},
            { name:"corporeal", weight: 10, requires : { age: {$gt: 7000} }},
        ],
        
    };
    
    constructor(options={}){
        this.random = options.random || new Random(options.seed || 'default');
    }
    
    get(contexts=Concept.defaults, subselects=[], results={}){
        const available = {};
        available[contexts._[0]] = contexts[contexts._[0]];
        contexts._.forEach((contextName, index)=>{
            const context = available[contextName] || [];
            const subselect = subselects[index];
            const selectable = subselect?context.filter(sift(subselect):context;
            const selected = this.random.array(context);
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
                const parts = enable.split(':');
                if(parts[1]){
                    //todo: check value
                    const foundIndex = contexts[parts[0]].findIndex((item)=> item.name === parts[1]);
                    if(foundIndex) contexts[parts[0]].splice(foundIndex, 1);
                }
            });
        });
    }
}