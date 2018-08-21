const file = require('file-system');
const http = require('http');
const https = require('https');

//http.get(options, callback)
//http.get(url, options, callback)
//http.request(options, callback)
//http.request(url, options, callback)

mockdataresponse = ()=> {

var _mockResponseData = {};

_mockResponseData.mock = (flag) => {
    console.log("called mmock constructor")
    redefineHTTP()
    console.log("Hooking upto http get module");
}

var redefineHTTP = () => {

    http.request = http.get = (...params) => {

        console.log("calling https get module");
        console.log(params);

        if(params.length < 1) {
            return;
        }

        if(typeof params[0] === "string") {
            var path = params[0].split("/")
        } else if(typeof params[0] === "object") {
            var path = params[0].url.split("/");
        }

        if(params.length === 2 && typeof params[1] === "function" ) {
            var callback = params[1]
        }

        if(params.length === 3 && typeof params[2] === "function") {
           var callback = params[2]
        }

        getFileAndNuke(path[path.length-1], callback)
    }
}

var getFileAndNuke = (path, callback) => {
    file.readFile(path+'.json', 'utf8', (err, data) => {
        if(err) {
            console.log(err)
            return
        }
        console.log(data)
        //console.log(nuke(JSON.parse(data)))
        callback(nuke(JSON.parse(data)))
    })
}


var stringDen = ['a','A','b','B','c','C','d','D','e','E','f','F','g','G','h','H','i','I','j','J','k','K','l','L','m','M','n','N','o','O','p','P','q','Q','r','R','s','S','t','T','u','U','v','V','w','W','x','X','y','Y','z','Z'];

_mockResponseData.arrayLimit = 10;

_mockResponseData.numberRamdomLimit = 100;

_mockResponseData.stringRamdomLimit = 100;

_mockResponseData.isObject = (data) => (typeof data === "object" && data.constructor.name === "Object")

_mockResponseData.isArray = (data) => (typeof data === "object" && data.constructor.name === "Array")

var nuke = (data)=>{

    var nukedData = {};

    for(key in data) {

        if(_mockResponseData.isObject(data[key])) {
            nukedData[key] = nuke(data[key])
        }

        if(_mockResponseData.isArray(data[key])) {
            nukedData[key] = nukeArray(data[key]);
        }

        if(data[key] === "string") {
            nukedData[key] = generateRandomString();
        }

        if(data[key] === "bool") {
            nukedData[key] = generateRandomBoolean();
        }

        if(data[key] === "number") {
            nukedData[key] = generateRandomNumber();
        }

    }
    //console.log(nukedData)
    return nukedData;
}

var nukeArray = (data) => {
    var nukedArray = [];
    for(i=0;i<_mockResponseData.arrayLimit;i++) {
        if(data[0] === "string") {
            nukedArray[i] = generateRandomString();
        }
        if(data[0] === "number") {
            nukedArray[i] = generateRandomNumber();
        }
    }
    return nukedArray;
}

var generateRandomBoolean = ()=>{
    return (Math.floor((Math.random() * _mockResponseData.stringRamdomLimit) + 1)%2)===0
}

var generateRandomString = ()=>{

    var length = Math.floor((Math.random() * _mockResponseData.stringRamdomLimit) + 1);

    var randomString = '';

    for(let i=0;i<length;i++) {

        let randomness = Math.floor((Math.random()*stringDen.length) + 1);

        randomString += stringDen[randomness];
    }

    return randomString;
}

var generateRandomNumber = ()=>Math.floor((Math.random() * _mockResponseData.numberRamdomLimit) + 1);
 
return _mockResponseData;
}

exports.mockResponseData = mockdataresponse();