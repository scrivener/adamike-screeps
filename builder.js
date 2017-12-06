
let roleBuilder = {
    run: function(creep) {
        //console.log('HI I AM A BUILDER IN A TICK FUCNTION');
        let capacity = creep.carryCapacity;
        let energy = creep.carry.energy;
        if (!creep.memory.building && energy === capacity) {
            creep.memory.building = true;
        } else if (creep.memory.building && energy === 0) {
            creep.memory.building = false;
        }
        if(!creep.memory.building){
            let errorCode = creep.withdraw(Game.spawns['Spawn_W8N3_001'], RESOURCE_ENERGY);
            if (errorCode == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn_W8N3_001']);
            }
        }
        else {
            if (Object.keys(Game.constructionSites).length > 0) {
                let target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                errorCode = creep.build(target);
                if (errorCode == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
            
        }
    }
        
    
}
module.exports = roleBuilder;
