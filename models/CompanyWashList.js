const {getRows, insertRow, updateRow, deleteRow} = require('../database/query');
var SqlString = require('sqlstring');

exports.find = async (offset, pageSize) => {
    const query = `SELECT  b.company_name as company_id_Value, k.wash as wash_id_Value, t.* FROM CompanyWashList t  join Company b on t.company_id = b.company_id  left join WashType k on t.wash_type = k.wash_id  LIMIT ?, ?`;
    return getRows(query,[offset,pageSize]);
}

exports.findOne = async (wash_list_id) => {
    const query = `SELECT  b.company_name as company_id_Value, k.wash as wash_id_Value, t.* FROM CompanyWashList t  join Company b on t.company_id = b.company_id  left join WashType k on t.wash_type = k.wash_id  WHERE t.wash_list_id=? LIMIT 0,1`;
    return getRows(query,[wash_list_id]);
}

exports.insert = async (object) => {
    const query = `INSERT INTO CompanyWashList set ?`;
    const id = await insertRow(query, object);
    if(id>0){
        return this.findOne(id);
    }
    else{
        return this.findOne(object.wash_list_id);
    }
    
}

exports.update = async (wash_list_id, object) => {
    const updateKeys = [];
    let updateValues = [];
    for (const key in object) {
        updateKeys.push(`${key}=?`);
        updateValues.push(`${object[key]}`);
    }
    let query = `UPDATE CompanyWashList SET ? WHERE wash_list_id= ?`;
    updateValues = updateValues.concat([wash_list_id])
    query = query.replace("?", updateKeys.join(","));
    const result = await updateRow(query, updateValues);
    return result ? this.findOne(wash_list_id) : null;
}

exports.remove = async (wash_list_id) => {
    const query = `DELETE FROM CompanyWashList Where wash_list_id= ? `;
    return deleteRow(query,[wash_list_id]);
}

exports.count = async () => {
    const query = `SELECT count(*) TotalCount FROM CompanyWashList t  join Company b on t.company_id = b.company_id  left join WashType k on t.wash_type = k.wash_id  `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}

exports.search = async (offset, pageSize, key) => {
    const query = `SELECT  b.company_name as company_id_Value, k.wash as wash_id_Value, t.* FROM CompanyWashList t  join Company b on t.company_id = b.company_id  left join WashType k on t.wash_type = k.wash_id  WHERE  LOWER(t.company_id) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.car_number) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.note) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.price) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.wash_date) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.wash_type) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.worker) LIKE `+SqlString.escape('%'+key+'%')+` LIMIT ?, ?`;
    return getRows(query,[offset, pageSize]);
}

exports.searchCount = async (key) => {
    const query = `SELECT count(*) TotalCount FROM CompanyWashList t  join Company b on t.company_id = b.company_id  left join WashType k on t.wash_type = k.wash_id  WHERE  LOWER(t.company_id) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.car_number) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.note) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.price) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.wash_date) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.wash_type) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.worker) LIKE `+SqlString.escape('%'+key+'%')+` `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}


exports.getByCompany_Id = async (offset, pageSize, company_id) => {
    const query = `SELECT  b.company_name as company_id_Value, k.wash as wash_id_Value, t.* FROM CompanyWashList t  join Company b on t.company_id = b.company_id  left join WashType k on t.wash_type = k.wash_id  WHERE t.company_id= ? LIMIT ?, ?`;
    return getRows(query,[company_id,offset,pageSize]);
}

exports.getByCompany_IdCount = async (company_id) => {
    const query = `SELECT count(*) TotalCount FROM CompanyWashList t  join Company b on t.company_id = b.company_id  left join WashType k on t.wash_type = k.wash_id  WHERE t.company_id= ?`;
    const result = await getRows(query,[company_id]);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}
exports.getByWash_Type = async (offset, pageSize, wash_type) => {
    const query = `SELECT  b.company_name as company_id_Value, k.wash as wash_id_Value, t.* FROM CompanyWashList t  join Company b on t.company_id = b.company_id  left join WashType k on t.wash_type = k.wash_id  WHERE t.wash_type= ? LIMIT ?, ?`;
    return getRows(query,[wash_type,offset,pageSize]);
}

exports.getByWash_TypeCount = async (wash_type) => {
    const query = `SELECT count(*) TotalCount FROM CompanyWashList t  join Company b on t.company_id = b.company_id  left join WashType k on t.wash_type = k.wash_id  WHERE t.wash_type= ?`;
    const result = await getRows(query,[wash_type]);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}
