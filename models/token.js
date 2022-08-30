const { getRows } = require('../database/query');

exports.authLogin = async (username, password) => {
    const query = `SELECT  t.* FROM Users t  WHERE t.user='${username}' AND t.password='${password}' LIMIT 0,1`;
    console.log(query)
    return getRows(query);
}
// const { getRows } = require('../database/query');

// exports.authLogin = async (username, password) => {
//     if (username == "zaxi" && password == "zaxi77777") {
//         return [{ user: username }];
//     }
// }

