const {getRows, insertRow, updateRow, deleteRow} = require('../database/query');
var SqlString = require('sqlstring');

exports.find = async (offset, pageSize) => {
    const query = `SELECT  pppp.full_name as subscriber_id_Value, t.* FROM SubscriberAction t  join Subscribers pppp on t.subscriber_id = pppp.subscriber_id  LIMIT ?, ?`;
    return getRows(query,[offset,pageSize]);
}

exports.findOne = async (action_id) => {
    const query = `SELECT  pppp.full_name as subscriber_id_Value, t.* FROM SubscriberAction t  join Subscribers pppp on t.subscriber_id = pppp.subscriber_id  WHERE t.action_id=? LIMIT 0,1`;
    return getRows(query,[action_id]);
}

exports.insert = async (object) => {
    const query = `INSERT INTO SubscriberAction set ?`;
    const id = await insertRow(query, object);
    if(id>0){
        return this.findOne(id);
    }
    else{
        return this.findOne(object.action_id);
    }
    
}

exports.update = async (action_id, object) => {
    const updateKeys = [];
    let updateValues = [];
    for (const key in object) {
        updateKeys.push(`${key}=?`);
        updateValues.push(`${object[key]}`);
    }
    let query = `UPDATE SubscriberAction SET ? WHERE action_id= ?`;
    updateValues = updateValues.concat([action_id])
    query = query.replace("?", updateKeys.join(","));
    const result = await updateRow(query, updateValues);
    return result ? this.findOne(action_id) : null;
}

exports.remove = async (action_id) => {
    const query = `DELETE FROM SubscriberAction Where action_id= ? `;
    return deleteRow(query,[action_id]);
}

exports.count = async () => {
    const query = `SELECT count(*) TotalCount FROM SubscriberAction t  join Subscribers pppp on t.subscriber_id = pppp.subscriber_id  `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}

exports.search = async (offset, pageSize, key) => {
    const query = `SELECT  pppp.full_name as subscriber_id_Value, t.* FROM SubscriberAction t  join Subscribers pppp on t.subscriber_id = pppp.subscriber_id  WHERE  LOWER(t.subscriber_id) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.date_of_wash) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.note) LIKE `+SqlString.escape('%'+key+'%')+` LIMIT ?, ?`;
    return getRows(query,[offset, pageSize]);
}

exports.searchCount = async (key) => {
    const query = `SELECT count(*) TotalCount FROM SubscriberAction t  join Subscribers pppp on t.subscriber_id = pppp.subscriber_id  WHERE  LOWER(t.subscriber_id) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.date_of_wash) LIKE `+SqlString.escape('%'+key+'%')+` OR LOWER(t.note) LIKE `+SqlString.escape('%'+key+'%')+` `;
    const result = await getRows(query);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}


exports.getBySubscriber_Id = async (offset, pageSize, subscriber_id) => {
    const query = `SELECT  pppp.full_name as subscriber_id_Value, t.* FROM SubscriberAction t  join Subscribers pppp on t.subscriber_id = pppp.subscriber_id  WHERE t.subscriber_id= ? LIMIT ?, ?`;
    return getRows(query,[subscriber_id,offset,pageSize]);
}

exports.getBySubscriber_IdCount = async (subscriber_id) => {
    const query = `SELECT count(*) TotalCount FROM SubscriberAction t  join Subscribers pppp on t.subscriber_id = pppp.subscriber_id  WHERE t.subscriber_id= ?`;
    const result = await getRows(query,[subscriber_id]);
    if (result && result[0] && result[0].TotalCount && result[0].TotalCount > 0) {
        return result[0].TotalCount;
    } else {
        return 0;
    }
}
