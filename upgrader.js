/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('upgrader');
 * mod.thing == 'a thing'; // true
 */
let localConfiguration = require('localConfiguration');
let spawn = localConfiguration.spawn;

let roleUpgrader = {
    run: function(creep) {
        //console.log('HI I AM A UPGRADER IN A TICK FUCNTION');
        
        let capacity = creep.carryCapacity;
        let energy = creep.carry.energy;
        
        if (!creep.memory.upgrading && energy === capacity) {
            creep.memory.upgrading = true;
        } else if (creep.memory.upgrading && energy === 0) {
            creep.memory.upgrading = false;
        }
            
        if (!creep.memory.upgrading) {
            let sources = creep.room.find(FIND_SOURCES);
            let sourceNumber = creep.name.split('_')[1] % sources.length;
            let source = sources[sourceNumber];
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        } else {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }

        
    }
}
module.exports = roleUpgrader;
