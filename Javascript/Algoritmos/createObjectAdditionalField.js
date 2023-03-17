var fields = {ca1: 'teste ca1', ca2: 'teste ca2', andre: ''};

var additionalFieldNames = Object.getOwnPropertyNames(fields);
var additionalFields = [];

additionalFieldNames.map(item => {
    additionalFields.push({
        'name': item,
        'value': fields[item]
    });
});

setFormData({...formData, AdditionalFields: additionalFields});

console.log('additionalFields: ', additionalFields);