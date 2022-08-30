const {getRows, insertRow, updateRow, deleteRow} = require('../database/query');
var SqlString = require('sqlstring');

exports.find = async (offset, pageSize) => {
    const query = `SELECT  xx.type_of_car as car_id_Value, qqqq.service as service_id_Value, hhh.wash as wash_id_Value, t.* FROM Subscribers t  join CarTypes xx on t.car_type = xx.car_id  left join ServiceType qqqq on t.service_type = qqqq.service_id  left join WashType hhh on t.wash_type = hhh.wash_id  LIMIT ?, ?`;
    return getRows(query,[offset,pageSize]);
}

exports.findOne = async (subscriber_id) => {
    const query = `SELECT  xx.type_of_car as car_id_Value, qqqq.service as service_id_Value, hhh.wash as wash_id_Value, t.* FROM Subscribers t  join CarTypes xx on t.car_type = xx.car_id  left join ServiceType qqqq on t.service_type = qqqq.service_id  left join WashType hhh on t.wash_type = hhh.wash_id  WHERE t.subscriber_id=? LIMIT 0,1`;
    return getRows(query,[subscriber_id]);
}

exports.insert = async (object) => {
    const query = `INSERT INTO Subscribers set ?`;
    const id = await insertRow(query, object);
    if(id>0){
        return this.findOne(id);
    }
    else{
        return this.findOne(object.subscriber_id);
    }
    
}

exports.update = async (subscriber_id, object) => {
    const updateKeys = [];
    let updateValues = [];
    for (const key in object) {
        updateKeys.push(`${key}=?`);
        updateValues.push(`${object[key]}`);
    }
    let query = `UPDATE Subscribers SET ? WHERE subscriber_id= ?`;
    updateValues = updateValues.concat([subscriber_id])
    query = query.replace("?", updateKeys.join(","));
    const result = await updateRow(query, updateValues);
    return result ? this.findOne(subscriber_id) : null;
}

exports.remove = async (subscriber_id) => {
    const query = `DELETE FROM Subscribers Where subscriber_id= ? `;
    return deleteRow(query,[subscriber_id]);
}

exports.count = async () => {
    const query = `SELECT count(*) TotalCount FROM Subscribers t  join CarTypes xx on t.car_type = xx.car_id  left join ServiceType qqqq on t.service_type = qqqq.service_id  left join WashType hhh on t.wash_type = hhh.wash_id  `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}

exports.search = async (offset, pageSize, key) => {
    const query = `SELECT  xx.type_of_car as car_id_Value, qqqq.service as service_id_Value, hhh.wash as wash_id_Value, t.* FROM Subscribers t  join CarTypes xx on t.car_type = xx.car_id  left join ServiceType qqqq on t.service_type = qqqq.service_id  left join WashType hhh on t.wash_type = hhh.wash_id  WHERE  LOWER(t.full_name) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.car_number) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.car_type) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.email) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.birth_date) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.service_type) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.wash_type) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.balance) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.active) LIKE `+SqlString.escape('%'+key+'%')+` LIMIT ?, ?`;
    return getRows(query,[offset, pageSize]);
}

exports.searchCount = async (key) => {
    const query = `SELECT count(*) TotalCount FROM Subscribers t  join CarTypes xx on t.car_type = xx.car_id  left join ServiceType qqqq on t.service_type = qqqq.service_id  left join WashType hhh on t.wash_type = hhh.wash_id  WHERE  LOWER(t.full_name) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.car_number) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.car_type) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.email) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.birth_date) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.service_type) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.wash_type) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.balance) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.active) LIKE `+SqlString.escape('%'+key+'%')+` `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}


exports.getByCar_Type = async (offset, pageSize, car_type) => {
    const query = `SELECT  xx.type_of_car as car_id_Value, qqqq.service as service_id_Value, hhh.wash as wash_id_Value, t.* FROM Subscribers t  join CarTypes xx on t.car_type = xx.car_id  left join ServiceType qqqq on t.service_type = qqqq.service_id  left join WashType hhh on t.wash_type = hhh.wash_id  WHERE t.car_type= ? LIMIT ?, ?`;
    return getRows(query,[car_type,offset,pageSize]);
}

exports.getByCar_TypeCount = async (car_type) => {
    const query = `SELECT count(*) TotalCount FROM Subscribers t  join CarTypes xx on t.car_type = xx.car_id  left join ServiceType qqqq on t.service_type = qqqq.service_id  left join WashType hhh on t.wash_type = hhh.wash_id  WHERE t.car_type= ?`;
    const result = await getRows(query,[car_type]);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}
exports.getByService_Type = async (offset, pageSize, service_type) => {
    const query = `SELECT  xx.type_of_car as car_id_Value, qqqq.service as service_id_Value, hhh.wash as wash_id_Value, t.* FROM Subscribers t  join CarTypes xx on t.car_type = xx.car_id  left join ServiceType qqqq on t.service_type = qqqq.service_id  left join WashType hhh on t.wash_type = hhh.wash_id  WHERE t.service_type= ? LIMIT ?, ?`;
    return getRows(query,[service_type,offset,pageSize]);
}

exports.getByService_TypeCount = async (service_type) => {
    const query = `SELECT count(*) TotalCount FROM Subscribers t  join CarTypes xx on t.car_type = xx.car_id  left join ServiceType qqqq on t.service_type = qqqq.service_id  left join WashType hhh on t.wash_type = hhh.wash_id  WHERE t.service_type= ?`;
    const result = await getRows(query,[service_type]);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}
exports.getByWash_Type = async (offset, pageSize, wash_type) => {
    const query = `SELECT  xx.type_of_car as car_id_Value, qqqq.service as service_id_Value, hhh.wash as wash_id_Value, t.* FROM Subscribers t  join CarTypes xx on t.car_type = xx.car_id  left join ServiceType qqqq on t.service_type = qqqq.service_id  left join WashType hhh on t.wash_type = hhh.wash_id  WHERE t.wash_type= ? LIMIT ?, ?`;
    return getRows(query,[wash_type,offset,pageSize]);
}

exports.getByWash_TypeCount = async (wash_type) => {
    const query = `SELECT count(*) TotalCount FROM Subscribers t  join CarTypes xx on t.car_type = xx.car_id  left join ServiceType qqqq on t.service_type = qqqq.service_id  left join WashType hhh on t.wash_type = hhh.wash_id  WHERE t.wash_type= ?`;
    const result = await getRows(query,[wash_type]);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}
