var AWS = require('aws-sdk');
AWS.config.update({
    region: process.env.AWS_REGION
});
var ddb = new AWS.DynamoDB({
    apiVersion: '2012-08-10'
});

const saveEmailSubscription = (email) => {
    var params = {
        TableName: 'email_subscriptions',
        Item: {
            'email': {
                S: email
            }
        },
        ConditionExpression:"attribute_not_exists(email)"
    };
   
   
    return new Promise((resolve, reject) => {
        ddb.putItem(params, function(err, data) {
            if (err) {
                if(err.code === "ConditionalCheckFailedException"){
                    reject("email_exist")
                } else { 
                    console.log(err)
                    reject("error")
                }
            } else {
                resolve("success")
            }
        });
    })
}

exports.handler = (event, context, callback) => {
    const email = JSON.parse(event.body).email
   
    saveEmailSubscription(email).then((res)=>{
        callback(null, res)
    })
    .catch(err=> {
         callback(null, err)
    })
};