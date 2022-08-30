module.exports = {

    "company_id": { required: true, type: "number" },
    "car_number": { required: true, type: "string" },
    "note": { required: false, type: "string" },
    "price": { required: false, type: "number" },
    "wash_date": { required: true, type: "date" },
    "wash_type": { required: false, type: "number" },
    "worker": { required: true, type: "string" },
};

// allowed types - number, string, boolean, object, undefined
