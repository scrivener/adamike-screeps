/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvester');
 * mod.thing == 'a thing'; // true
 */

let localConfiguration = require('localConfiguration');
let spawn = localConfiguration.spawn;

let roleHarvester = {
    run: function(creep) {
        let capacity = creep.carryCapacity;
        let energy = creep.carry.energy;
        if (energy < capacity) {
            let sources = creep.room.find(FIND_SOURCES);
            let sourceNumber = creep.name.split('_')[1] % sources.length;
            let source = sources[sourceNumber];
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        } else {
            if (Game.spawns[spawn].energy < Game.spawns[spawn].energyCapacity) {
                let errorCode = creep.transfer(Game.spawns[spawn], RESOURCE_ENERGY);
                if (errorCode == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.spawns[spawn]);
                }
            } else {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
    }
}
module.exports = roleHarvester;
