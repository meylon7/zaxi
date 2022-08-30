const {getRows, insertRow, updateRow, deleteRow} = require('../database/query');
var SqlString = require('sqlstring');

exports.find = async (offset, pageSize) => {
    const query = `SELECT  t.* FROM WashType t  LIMIT ?, ?`;
    return getRows(query,[offset,pageSize]);
}

exports.findOne = async (wash_id) => {
    const query = `SELECT  t.* FROM WashType t  WHERE t.wash_id=? LIMIT 0,1`;
    return getRows(query,[wash_id]);
}

exports.insert = async (object) => {
    const query = `INSERT INTO WashType set ?`;
    const id = await insertRow(query, object);
    if(id>0){
        return this.findOne(id);
    }
    else{
        return this.findOne(object.wash_id);
    }
    
}

exports.update = async (wash_id, object) => {
    const updateKeys = [];
    let updateValues = [];
    for (const key in object) {
        updateKeys.push(`${key}=?`);
        updateValues.push(`${object[key]}`);
    }
    let query = `UPDATE WashType SET ? WHERE wash_id= ?`;
    updateValues = updateValues.concat([wash_id])
    query = query.replace("?", updateKeys.join(","));
    const result = await updateRow(query, updateValues);
    return result ? this.findOne(wash_id) : null;
}

exports.remove = async (wash_id) => {
    const query = `DELETE FROM WashType Where wash_id= ? `;
    return deleteRow(query,[wash_id]);
}

exports.count = async () => {
    const query = `SELECT count(*) TotalCount FROM WashType t  `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}

exports.search = async (offset, pageSize, key) => {
    const query = `SELECT  t.* FROM WashType t  WHERE  LOWER(t.wash) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.price) LIKE `+SqlString.escape('%'+key+'%')+` LIMIT ?, ?`;
    return getRows(query,[offset, pageSize]);
}

exports.searchCount = async (key) => {
    const query = `SELECT count(*) TotalCount FROM WashType t  WHERE  LOWER(t.wash) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.price) LIKE `+SqlString.escape('%'+key+'%')+` `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}


