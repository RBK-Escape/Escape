const { db } = require('./index.js');

///////////////////////////////////////////////////////////
// query to fetch element for the store.js component
//////////////////////////////////////////////////////////
const getAllEquipments = () => {
    return db.queryAsync('select * from equipments where status = "accepted" ')
}

const getEquipmentsToRent = () => {
    return db.queryAsync('select * from equipments where toRent=1 and status = "accepted" ')
}

const getEquipmentsToBuy = () => {
    return db.queryAsync('select * from equipments where toSell=1 and status = "accepted"')
}

const getEquipmentByPriceInc = (type) => {
    if ( type === 'toRent') {
    return db.queryAsync('select * from equipments  where toRent = 1 order by price')
    } else if ( type === 'toSell') {
    return db.queryAsync('select * from equipments  where toSell = 1 order by price')

    }
}

const updateInCartValue = (id) => {
    return db.queryAsync(`UPDATE equipments SET inCart= !inCart WHERE id= '${id}'`)
}

const removeItemFromCart = (id) =>{
    if (id === "all") {
        return db.queryAsync(`UPDATE equipments SET inCart= 0 `)
    } else {
        return db.queryAsync(`UPDATE equipments SET inCart= 0 WHERE id= '${id}'`)
    }
}

/////////////////////////////////////////////////////////////


module.exports = {
    getAllEquipments,
    getEquipmentsToRent,
    getEquipmentsToBuy,
    getEquipmentByPriceInc,
    updateInCartValue,
    removeItemFromCart
}

