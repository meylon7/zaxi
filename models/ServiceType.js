const {getRows, insertRow, updateRow, deleteRow} = require('../database/query');
var SqlString = require('sqlstring');

exports.find = async (offset, pageSize) => {
    const query = `SELECT  t.* FROM ServiceType t  LIMIT ?, ?`;
    return getRows(query,[offset,pageSize]);
}

exports.findOne = async (service_id) => {
    const query = `SELECT  t.* FROM ServiceType t  WHERE t.service_id=? LIMIT 0,1`;
    return getRows(query,[service_id]);
}

exports.insert = async (object) => {
    const query = `INSERT INTO ServiceType set ?`;
    const id = await insertRow(query, object);
    if(id>0){
        return this.findOne(id);
    }
    else{
        return this.findOne(object.service_id);
    }
    
}

exports.update = async (service_id, object) => {
    const updateKeys = [];
    let updateValues = [];
    for (const key in object) {
        updateKeys.push(`${key}=?`);
        updateValues.push(`${object[key]}`);
    }
    let query = `UPDATE ServiceType SET ? WHERE service_id= ?`;
    updateValues = updateValues.concat([service_id])
    query = query.replace("?", updateKeys.join(","));
    const result = await updateRow(query, updateValues);
    return result ? this.findOne(service_id) : null;
}

exports.remove = async (service_id) => {
    const query = `DELETE FROM ServiceType Where service_id= ? `;
    return deleteRow(query,[service_id]);
}

exports.count = async () => {
    const query = `SELECT count(*) TotalCount FROM ServiceType t  `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}

exports.search = async (offset, pageSize, key) => {
    const query = `SELECT  t.* FROM ServiceType t  WHERE  LOWER(t.service) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.price) LIKE `+SqlString.escape('%'+key+'%')+` LIMIT ?, ?`;
    return getRows(query,[offset, pageSize]);
}

exports.searchCount = async (key) => {
    const query = `SELECT count(*) TotalCount FROM ServiceType t  WHERE  LOWER(t.service) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.price) LIKE `+SqlString.escape('%'+key+'%')+` `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}


