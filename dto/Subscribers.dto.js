module.exports = {

    "full_name": { required: true, type: "string" },
    "car_number": { required: true, type: "string" },
    "car_type": { required: true, type: "number" },
    "email": { required: false, type: "string" },
    "birth_date": { required: false, type: "date" },
    "service_type": { required: false, type: "number" },
    "wash_type": { required: false, type: "number" },
    "balance": { required: false, type: "number" },
    "active": { required: true, type: "boolean" },
};

// allowed types - number, string, boolean, object, undefined
