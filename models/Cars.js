const {getRows, insertRow, updateRow, deleteRow} = require('../database/query');
var SqlString = require('sqlstring');

exports.find = async (offset, pageSize) => {
    const query = `SELECT  ee.company_name as company_id_Value, xxxx.type_of_car as car_id_Value, t.* FROM Cars t  left join Company ee on t.company_id = ee.company_id  left join CarTypes xxxx on t.car_type = xxxx.car_id  LIMIT ?, ?`;
    return getRows(query,[offset,pageSize]);
}

exports.findOne = async (car_number) => {
    const query = `SELECT  ee.company_name as company_id_Value, xxxx.type_of_car as car_id_Value, t.* FROM Cars t  left join Company ee on t.company_id = ee.company_id  left join CarTypes xxxx on t.car_type = xxxx.car_id  WHERE t.car_number=? LIMIT 0,1`;
    return getRows(query,[car_number]);
}

exports.insert = async (object) => {
    const query = `INSERT INTO Cars set ?`;
    const id = await insertRow(query, object);
    if(id>0){
        return this.findOne(id);
    }
    else{
        return this.findOne(object.car_number);
    }
    
}

exports.update = async (car_number, object) => {
    const updateKeys = [];
    let updateValues = [];
    for (const key in object) {
        updateKeys.push(`${key}=?`);
        updateValues.push(`${object[key]}`);
    }
    let query = `UPDATE Cars SET ? WHERE car_number= ?`;
    updateValues = updateValues.concat([car_number])
    query = query.replace("?", updateKeys.join(","));
    const result = await updateRow(query, updateValues);
    return result ? this.findOne(car_number) : null;
}

exports.remove = async (car_number) => {
    const query = `DELETE FROM Cars Where car_number= ? `;
    return deleteRow(query,[car_number]);
}

exports.count = async () => {
    const query = `SELECT count(*) TotalCount FROM Cars t  left join Company ee on t.company_id = ee.company_id  left join CarTypes xxxx on t.car_type = xxxx.car_id  `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}

exports.search = async (offset, pageSize, key) => {
    const query = `SELECT  ee.company_name as company_id_Value, xxxx.type_of_car as car_id_Value, t.* FROM Cars t  left join Company ee on t.company_id = ee.company_id  left join CarTypes xxxx on t.car_type = xxxx.car_id  WHERE  LOWER(t.car_number) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.company_id) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.car_type) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.note) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.price) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.out_only_price) LIKE `+SqlString.escape('%'+key+'%')+` LIMIT ?, ?`;
    return getRows(query,[offset, pageSize]);
}

exports.searchCount = async (key) => {
    const query = `SELECT count(*) TotalCount FROM Cars t  left join Company ee on t.company_id = ee.company_id  left join CarTypes xxxx on t.car_type = xxxx.car_id  WHERE  LOWER(t.car_number) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.company_id) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.car_type) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.note) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.price) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.out_only_price) LIKE `+SqlString.escape('%'+key+'%')+` `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}


exports.getByCompany_Id = async (offset, pageSize, company_id) => {
    const query = `SELECT  ee.company_name as company_id_Value, xxxx.type_of_car as car_id_Value, t.* FROM Cars t  left join Company ee on t.company_id = ee.company_id  left join CarTypes xxxx on t.car_type = xxxx.car_id  WHERE t.company_id= ? LIMIT ?, ?`;
    return getRows(query,[company_id,offset,pageSize]);
}

exports.getByCompany_IdCount = async (company_id) => {
    const query = `SELECT count(*) TotalCount FROM Cars t  left join Company ee on t.company_id = ee.company_id  left join CarTypes xxxx on t.car_type = xxxx.car_id  WHERE t.company_id= ?`;
    const result = await getRows(query,[company_id]);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}
exports.getByCar_Type = async (offset, pageSize, car_type) => {
    const query = `SELECT  ee.company_name as company_id_Value, xxxx.type_of_car as car_id_Value, t.* FROM Cars t  left join Company ee on t.company_id = ee.company_id  left join CarTypes xxxx on t.car_type = xxxx.car_id  WHERE t.car_type= ? LIMIT ?, ?`;
    return getRows(query,[car_type,offset,pageSize]);
}

exports.getByCar_TypeCount = async (car_type) => {
    const query = `SELECT count(*) TotalCount FROM Cars t  left join Company ee on t.company_id = ee.company_id  left join CarTypes xxxx on t.car_type = xxxx.car_id  WHERE t.car_type= ?`;
    const result = await getRows(query,[car_type]);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}
