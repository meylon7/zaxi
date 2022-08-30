const {getRows, insertRow, updateRow, deleteRow} = require('../database/query');
var SqlString = require('sqlstring');

exports.find = async (offset, pageSize) => {
    const query = `SELECT  t.* FROM Company t  LIMIT ?, ?`;
    return getRows(query,[offset,pageSize]);
}

exports.findOne = async (company_id) => {
    const query = `SELECT  t.* FROM Company t  WHERE t.company_id=? LIMIT 0,1`;
    return getRows(query,[company_id]);
}

exports.insert = async (object) => {
    const query = `INSERT INTO Company set ?`;
    const id = await insertRow(query, object);
    if(id>0){
        return this.findOne(id);
    }
    else{
        return this.findOne(object.company_id);
    }
    
}

exports.update = async (company_id, object) => {
    const updateKeys = [];
    let updateValues = [];
    for (const key in object) {
        updateKeys.push(`${key}=?`);
        updateValues.push(`${object[key]}`);
    }
    let query = `UPDATE Company SET ? WHERE company_id= ?`;
    updateValues = updateValues.concat([company_id])
    query = query.replace("?", updateKeys.join(","));
    const result = await updateRow(query, updateValues);
    return result ? this.findOne(company_id) : null;
}

exports.remove = async (company_id) => {
    const query = `DELETE FROM Company Where company_id= ? `;
    return deleteRow(query,[company_id]);
}

exports.count = async () => {
    const query = `SELECT count(*) TotalCount FROM Company t  `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}

exports.search = async (offset, pageSize, key) => {
    const query = `SELECT  t.* FROM Company t  WHERE  LOWER(t.company_name) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.contact_person) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.contact_phone) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.num_of_cars) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.regular_price) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.email) LIKE `+SqlString.escape('%'+key+'%')+` LIMIT ?, ?`;
    return getRows(query,[offset, pageSize]);
}

exports.searchCount = async (key) => {
    const query = `SELECT count(*) TotalCount FROM Company t  WHERE  LOWER(t.company_name) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.contact_person) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.contact_phone) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.num_of_cars) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.regular_price) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.email) LIKE `+SqlString.escape('%'+key+'%')+` `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}


