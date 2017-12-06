let roleHarvester = require('harvester');
let roleUpgrader = require('upgrader');
let roleBuilder = require('builder');

let localConfiguration = require('localConfiguration');
let spawn = localConfiguration.spawn;

const MAX_HARVESTERS = 4;
const MAX_UPGRADERS = 7;
const MAX_BUILDERS = 2;

module.exports.loop = function() {
    let harvesters = [];
    let upgraders = [];
    let builders = [];
    for (let creepName in Game.creeps) {
        let creep = Game.creeps[creepName];
        if (creep.memory.type == 'HARVESTER') {
            harvesters.push(creep);
        } else if (creep.memory.type == 'UPGRADER') {
            upgraders.push(creep);
        } else if (creep.memory.type == 'BUILDER') {
            builders.push(creep);
        }
    }
    
    if (harvesters.length < MAX_HARVESTERS) {
        // console.log(harvesters.length, 'harvesters');
        let i;
        for (i=1; i<MAX_HARVESTERS+1; i++) {
            if (Game.spawns[spawn].createCreep([WORK,CARRY,MOVE], `HARVESTER_${i}`, {'type': 'HARVESTER'}) != ERR_NAME_EXISTS) {
                
                // console.log('I break', i);
                break;
            }
        }
    } else if (upgraders.length < MAX_UPGRADERS) {
        let i;
        for (i=1; i<MAX_UPGRADERS+1; i++) {
            if (Game.spawns[spawn].createCreep([WORK,CARRY,MOVE], `UPGRADER_${i}`, {'type': 'UPGRADER', 'upgrading': false}) != ERR_NAME_EXISTS) {
                break;
            }
        }
    } else if (builders.length < MAX_BUILDERS) {
        let i;
        for (i=1; i<MAX_BUILDERS+1; i++) {
            if (Game.spawns[spawn].createCreep([WORK,CARRY,MOVE], `BUILDER_${i}`, {'type': 'BUILDER', 'building': false}) != ERR_NAME_EXISTS) {
                break;
            }
        }
    }
    
    for (let creepName in Game.creeps) {
        let creep = Game.creeps[creepName];
        let type = creep.memory.type;

        if (type == 'HARVESTER'){
            roleHarvester.run(creep);
        } else if (type == 'UPGRADER') {
            roleUpgrader.run(creep);
        } else if (type == 'BUILDER') {
            roleBuilder.run(creep);
        }
    }
}
