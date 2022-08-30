const { getRows, insertRow, updateRow, deleteRow } = require('../database/query');
var SqlString = require('sqlstring');

exports.find = async (offset, pageSize) => {
    const query = `SELECT * FROM SubscriberCars`;
    return getRows(query, [offset, pageSize]);
}
exports.findOne = async (car_number) => {
    const query = `SELECT  * FROM SubscriberCars WHERE car_number =? LIMIT 0,1`;
    return getRows(query, [car_number]);
}

exports.insert = async (object) => {
    const query = `INSERT INTO SubscriberCars set ?`;
    const id = await insertRow(query, object);
    if (id > 0) {
        return this.findOne(id);
    }
    else {
        return this.findOne(object.id);
    }

}

exports.update = async (id, object) => {
    const updateKeys = [];
    let updateValues = [];
    for (const key in object) {
        updateKeys.push(`${key}=?`);
        updateValues.push(`${object[key]}`);
    }
    let query = `UPDATE SubscriberCars SET ? WHERE id= ?`;
    updateValues = updateValues.concat([id])
    query = query.replace("?", updateKeys.join(","));
    const result = await updateRow(query, updateValues);
    return result ? this.findOne(id) : null;
}

exports.remove = async (car_number) => {
    const query = `DELETE FROM SubscriberCars Where id= ? `;
    return deleteRow(query, [id]);
}

exports.search = async (offset, pageSize, key) => {
    const query = `SELECT  * as car_id_Value, t.* FROM SubscriberCars c  left join Subscribers sb on c.company_id = sb.company_id  WHERE  LOWER(c.car_number) LIKE ` + SqlString.escape('%' + key + '%') + ` OR LOWER(sb.subscriber_id) LIKE `;
    return getRows(query, [offset, pageSize]);
}

