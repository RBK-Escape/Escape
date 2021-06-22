const {db} = require('./index.js');

///////////////////////////////////////////////////////////
// query to fetch element for the store.js component
//////////////////////////////////////////////////////////
const getAllEquipments = () => {
    return db.queryAsync('select * from equipments')
}

const getEquipmentsToRent = () => {
    return db.queryAsync('select * from equipments where toRent=1')
}

const getEquipmentsToBuy = () => {
    return db.queryAsync('select * from equipments where toSell=1')
}


/////////////////////////////////////////////////////////////


module.exports= {
    getAllEquipments,
    getEquipmentsToRent,
    getEquipmentsToBuy
}