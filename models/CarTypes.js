const {getRows, insertRow, updateRow, deleteRow} = require('../database/query');
var SqlString = require('sqlstring');

exports.find = async (offset, pageSize) => {
    const query = `SELECT  t.* FROM CarTypes t  LIMIT ?, ?`;
    return getRows(query,[offset,pageSize]);
}

exports.findOne = async (car_id) => {
    const query = `SELECT  t.* FROM CarTypes t  WHERE t.car_id=? LIMIT 0,1`;
    return getRows(query,[car_id]);
}

exports.insert = async (object) => {
    const query = `INSERT INTO CarTypes set ?`;
    const id = await insertRow(query, object);
    if(id>0){
        return this.findOne(id);
    }
    else{
        return this.findOne(object.car_id);
    }
    
}

exports.update = async (car_id, object) => {
    const updateKeys = [];
    let updateValues = [];
    for (const key in object) {
        updateKeys.push(`${key}=?`);
        updateValues.push(`${object[key]}`);
    }
    let query = `UPDATE CarTypes SET ? WHERE car_id= ?`;
    updateValues = updateValues.concat([car_id])
    query = query.replace("?", updateKeys.join(","));
    const result = await updateRow(query, updateValues);
    return result ? this.findOne(car_id) : null;
}

exports.remove = async (car_id) => {
    const query = `DELETE FROM CarTypes Where car_id= ? `;
    return deleteRow(query,[car_id]);
}

exports.count = async () => {
    const query = `SELECT count(*) TotalCount FROM CarTypes t  `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}

exports.search = async (offset, pageSize, key) => {
    const query = `SELECT  t.* FROM CarTypes t  WHERE  LOWER(t.type_of_car) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.price) LIKE `+SqlString.escape('%'+key+'%')+` LIMIT ?, ?`;
    return getRows(query,[offset, pageSize]);
}

exports.searchCount = async (key) => {
    const query = `SELECT count(*) TotalCount FROM CarTypes t  WHERE  LOWER(t.type_of_car) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.price) LIKE `+SqlString.escape('%'+key+'%')+` `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}


