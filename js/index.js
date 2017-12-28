var awsIot = require('aws-iot-device-sdk');
var aws = require('aws-sdk');
require("./plugins.js")

aws.config.region = REGION;
aws.config.credentials = new aws.CognitoIdentityCredentials({
    IdentityPoolId: IDENTITY_POOL_ID
});

aws.config.credentials.get(() => {
    console.log("got credentials, valid until: ", aws.config.credentials.expireTime);
    iot.connect(aws.config.credentials.accessKeyId,
                aws.config.credentials.secretAccessKey,
                aws.config.credentials.sessionToken)
});

var iot = {
    connect: (accessKey, secretKey, sessionToken) => {
        client = awsIot.device({
            region: REGION,
            protocol: 'wss',
            accessKeyId: accessKey,
            secretKey: secretKey,
            sessionToken: sessionToken,
            port: 443,
            host: IOT_ENDPOINT
        });

        client.on('connect', onConnect);
        client.on('message', onMessage);
        client.on('close', onClose);
    },
};

var onConnect = () => {
    client.subscribe("cosmo/data");
    console.log('Connected');
};

var onMessage = (topic, message) => {
    console.log(message.toString());
    data = JSON.parse(message.toString());
    time = new Date(Date.parse(data.time));
    $('#time').text(time.toLocaleTimeString() + " " + time.toLocaleDateString());
    color = data.spO2 < 90 ? "red" : "green";
    $('#spO2').html("<span style='color:" + color + "'>" + data.spO2 + "</span>");
    $('#pulse').text(data.pulse);
};

var onClose = () => {
    console.log('Connection failed');
};
