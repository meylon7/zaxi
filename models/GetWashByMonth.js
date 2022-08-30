const {getRows} = require('../database/query');

exports.getWashByMonth = async (month, year) => {
    const query = `call GetWashByMonth(?,?)`;
    return getRows(query,[month,year]);
}

exports.getCompanyWashByMonth = async (month, year, company_id) => {
    const query = `call GetCompanyWashByMonth(?,?,?)`;
    return getRows(query,[month, year, company_id]);
}
