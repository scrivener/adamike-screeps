let localConfiguration = require('localConfiguration');
let spawn = localConfiguration.spawn;
let MAX_HARVESTERS = localConfiguration.MAX_HARVESTERS;
let MAX_UPGRADERS = localConfiguration.MAX_UPGRADERS;
let MAX_BUILDERS = localConfiguration.MAX_BUILDERS;

let utils = {
  spawnLogic: function(creeps) {
    if (creeps.harvesters.length < MAX_HARVESTERS) {
        let i;
        for (i=1; i<MAX_HARVESTERS+1; i++) {
            if (Game.spawns[spawn].createCreep([WORK,CARRY,MOVE], `HARVESTER_${i}`, {'type': 'HARVESTER'}) != ERR_NAME_EXISTS) {
                
                // console.log('I break', i);
                break;
            }
        }
    } else if (creeps.upgraders.length < MAX_UPGRADERS) {
        let i;
        for (i=1; i<MAX_UPGRADERS+1; i++) {
            if (Game.spawns[spawn].createCreep([WORK,CARRY,MOVE], `UPGRADER_${i}`, {'type': 'UPGRADER', 'upgrading': false}) != ERR_NAME_EXISTS) {
                break;
            }
        }
    } else if (creeps.builders.length < MAX_BUILDERS) {
        let i;
        for (i=1; i<MAX_BUILDERS+1; i++) {
            if (Game.spawns[spawn].createCreep([WORK,CARRY,MOVE], `BUILDER_${i}`, {'type': 'BUILDER', 'building': false}) != ERR_NAME_EXISTS) {
                break;
            }
        }
    }

  },

  getAllCreeps: function() {
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
    return {
      harvesters: harvesters,
      upgraders: upgraders,
      builders: builders
    }

  },

  getAllExtensionsInRoom: function(room) {
    return room.find(FIND_MY_STRUCTURES, {
      filter: { structureType: STRUCTURE_EXTENSION }
    });
  },

  getExtensionsWithSpaceInRoom: function(room) {
    let extensions = utils.getAllExtensionsInRoom(room);
    return _.filter(extensions, function(extension) {
      return extension.energy < extension.energyCapacity;
    });

  },
}

module.exports = utils;
