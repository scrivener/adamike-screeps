/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvester');
 * mod.thing == 'a thing'; // true
 */


let roleHarvester = {
    run: function(creep) {
        //console.log('HI I AM A HARVESTER IN A TICK FUCNTION');
        
        let capacity = creep.carryCapacity;
        let energy = creep.carry.energy;
        if (energy < capacity) {
            let sourceNumber = creep.name.split('_')[1] % 2;
            if (isNaN(sourceNumber)) {
                sourceNumber = 0;
            }
            let source = creep.room.find(FIND_SOURCES)[sourceNumber];
            //creep.say(`${energy}/${capacity}`);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        } else {
            if (Game.spawns['Spawn_W8N3_001'].energy < Game.spawns['Spawn_W8N3_001'].energyCapacity) {
                let errorCode = creep.transfer(Game.spawns['Spawn_W8N3_001'], RESOURCE_ENERGY);
                if (errorCode == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.spawns['Spawn_W8N3_001']);
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