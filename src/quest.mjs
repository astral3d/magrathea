class Quest{
    constructor(world, options={}, cast=[], places=[]){
        
        // the main driver of the action for the quest (usually the player or the quest giver)
        this.protagonist = options.protagonist;
        // the main opposer of the change the protagonist is driving
        this.antagonist = options.antagonist || random()
        // a list of drivers for the antagonist
        this.rationale = [];
        // the potential terminal conditions for this quest
        this.outcomes = [];
        //quest items
        this.items = [];
        // the major sequence of plot events for this quest
        this.idealEventSequence = [];
        //some assigned tropes to keep the plots in normative boundaries
        this.tropes = []; 
        
        Object.defineProperty(this, 'next', {
            set: ()=>{},
            get: ()=>{
                const objectives = this.objectives();
                return objectives[objectives.length-1];
            }
        });
    }
    
    //communicate with the npc within a detailed context about this quest
    ask(query, npc){
        
    }
    
    //the individual steps in this quest and current status
    objectives(){
        
    }
    
    //process the state to see if terminal conditions are satisfied
    evaluate(state){
        
    }
    
    //test if the provided object is a participant in this quest
    participant(object){
        
    }
    
}

Quest.create = (world, options={}, cast=[], places=[])=>{
    const quest = new Quest(world, options, cast, places);
    return quest;
};