var AWS = require('aws-sdk');

exports.handler = async (event) => {

    let S3 = new AWS.S3({ region: process.env.AWS_REGION });

    var email = event['rawPath'].replace('/', '');

    var params = {
        Bucket: 'nomfundo-emails', //bucket to store email addresses
        Key: email + ".txt",
        Body: JSON.stringify(email),
        ContentType: 'text/plain',
    };

    let s3Response = await S3.upload(params).promise();

    const response = {
        'statusCode': 200,
        'headers': { 'Content-Type': 'application/json' },
        'body': JSON.stringify({
            "email": email,
            "s3Path": s3Response.Location
        })
    }

    return response;

};
