import { Random } from '@environment-safe/random';
import { PersonalityComponent } from '@open-automaton/kryten';

import { Entity } from '@astral3d/marker-engine';
export class NPC extends Entity{
    constructor(context={}){
        if(context.seed && !context.random){
            console.log('npc seed', context.seed);
            context.random = new Random({ seed: context.seed });
        }
        super(context);
    }
    
    communicate(world, activePlayerQuests){
        
    }
    
    logNpcEvent(event){
        
    }
    
}

export const Personalities = {};
//TODO: this should come from the skill progression data
const allSkills = {
    'leader': 'A leader uses a process of social influence in which a person can enlist the aid and support of others in the accomplishment of a common and ethical task. In other words, leadership is an influential power-relationship in which the power of one party (the "leader") promotes movement/change in others (the "followers"). Some have challenged the more traditional managerial views of leadership (which portray leadership as something possessed or owned by one individual due to their role or authority), and instead advocate the complex nature of leadership which is found at all levels of institutions, both within formal and informal roles.',
    'chef': 'This person is in charge of all activities related to the kitchen, which usually includes menu creation, management of kitchen staff, ordering and purchasing of inventory, controlling raw material costs and plating design. Chef de cuisine is the traditional French term from which the English word chef is derived. Head chef is often used to designate someone with the same duties as an executive chef, but there is usually someone in charge of a head chef, possibly making the larger executive decisions such as the direction of menu, the final authority in staff management decisions, and so on. This is often the case for executive chefs with multiple restaurants. Involved in checking the sensory evaluation of dishes after preparation and they are well aware of each sensory property of those specific dishes.',
    'bureaucrat': `Bureaucrats play various roles in modern society, by virtue of holding administrative, functional, and managerial positions in government. They carry out the day-to-day implementation of enacted policies for central government agencies, such as postal services, education and healthcare administration, and various regulatory bodies.
    -They are personally free and appointed to their position on the basis of conduct.
    -They exercise the authority delegated to them in accordance with impersonal rules, and their loyalty is enlisted on behalf of the faithful execution of their official duties.
    -Their appointment and job placement are dependent upon their technical qualifications.
    -Their administrative work is a full-time occupation.
    -Their work is rewarded by a regular salary and prospects of advancement in a lifetime career.
    -They must exercise their judgment and their skills, but their duty is to place these at the service of a higher authority. Ultimately they are responsible only for the impartial execution of assigned tasks and must sacrifice their personal judgment if it runs counter to their official duties.
    -Bureaucratic control is the use of rules, regulations, and formal authority to guide performance. It includes such things as budgets, statistical reports, and performance appraisals to regulate behavior and results.`,
    'tradesman': 'A tradesperson or tradesman/woman is a skilled worker that specialises in a particular trade. Tradespeople (tradesmen/women) usually gain their skills through work experience, on-the-job training, an apprenticeship program or formal education. As opposed to a master craftsman or an artisan, a tradesperson (tradesman/woman) is not necessarily restricted to manual work.',
    'teacher':'',
    'warrior':'',
    'explorer':'',
    'acetic':'',
    'captain':'',
    'sage':'',
}

const index = [
    (new PersonalityComponent({
        name : 'nationality',
        seed : (random, persona)=>{
            if(!persona.origin) persona.origin = {};
            const nationality = {};
            console.log('>>>', nationality);
            persona.origin.nationality = nationality;
        },
        state : ({seed, query, persona})=>{
            const section = `
Nationality
-----------
This is the makeup of your national identity:`;
            return section;
        }
    })),
    (new PersonalityComponent({
        name : 'skills',
        seed : (random, persona)=>{
            const skills = {};
            const allSkillNames = Object.keys(allSkills);
            const numSkills = random.integer(1, 4);
            let skillName = null;
            let skillIndex = null;
            for(let lcv=0; lcv< numSkills; lcv++){
                skillIndex = random.integer(0, allSkillNames.length);
                skillName = allSkillNames[skillIndex];
                allSkillNames.splice(skillIndex, 1);
                skills[skillName] = allSkills[skillName];
            }
            persona.skills = skills;
        },
        state : ({seed, query, persona})=>{
            let skills = '';
            const keys = Object.keys(persona.skills);
            for(let lcv=0; lcv < keys.length; lcv++){
                skills += `${keys[lcv]}: \`${persona.skills[keys[lcv]]}\`\n`;
            }
            const section = `
Skills
-----------
These are the skills your character has and the extertises they discuss when discussing their professional life or "talking shop".

Your skills are:
${skills}`;
            return section;
        },
    })),
    ...PersonalityComponent.choose(['state', 'ocean'])
];

Personalities.choose = (nameList)=>{
    const results = index.filter((item)=> nameList.indexOf(item.options.name) !== -1);
    return results;
};
