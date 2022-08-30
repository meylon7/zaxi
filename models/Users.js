const {getRows, insertRow, updateRow, deleteRow} = require('../database/query');
var SqlString = require('sqlstring');

exports.find = async (offset, pageSize) => {
    const query = `SELECT  t.* FROM Users t  LIMIT ?, ?`;
    return getRows(query,[offset,pageSize]);
}

exports.findOne = async (user_id) => {
    const query = `SELECT  t.* FROM Users t  WHERE t.user_id=? LIMIT 0,1`;
    return getRows(query,[user_id]);
}

exports.insert = async (object) => {
    const query = `INSERT INTO Users set ?`;
    const id = await insertRow(query, object);
    if(id>0){
        return this.findOne(id);
    }
    else{
        return this.findOne(object.user_id);
    }
    
}

exports.update = async (user_id, object) => {
    const updateKeys = [];
    let updateValues = [];
    for (const key in object) {
        updateKeys.push(`${key}=?`);
        updateValues.push(`${object[key]}`);
    }
    let query = `UPDATE Users SET ? WHERE user_id= ?`;
    updateValues = updateValues.concat([user_id])
    query = query.replace("?", updateKeys.join(","));
    const result = await updateRow(query, updateValues);
    return result ? this.findOne(user_id) : null;
}

exports.remove = async (user_id) => {
    const query = `DELETE FROM Users Where user_id= ? `;
    return deleteRow(query,[user_id]);
}

exports.count = async () => {
    const query = `SELECT count(*) TotalCount FROM Users t  `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}

exports.search = async (offset, pageSize, key) => {
    const query = `SELECT  t.* FROM Users t  WHERE  LOWER(t.user) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.password) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.display_name) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.user_type) LIKE `+SqlString.escape('%'+key+'%')+` LIMIT ?, ?`;
    return getRows(query,[offset, pageSize]);
}

exports.searchCount = async (key) => {
    const query = `SELECT count(*) TotalCount FROM Users t  WHERE  LOWER(t.user) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.password) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.display_name) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.user_type) LIKE `+SqlString.escape('%'+key+'%')+` `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}


