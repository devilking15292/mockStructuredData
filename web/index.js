(function(window){
    
mockdataresponse = ()=> {

    var _mockResponseData = {};

    _mockResponseData.mock = (data) => {
        return nuke(JSON.parse(data));
    }

    var stringDen = ['a','A','b','B','c','C','d','D','e','E','f','F','g','G','h','H','i','I','j','J','k','K','l','L','m','M','n','N','o','O','p','P','q','Q','r','R','s','S','t','T','u','U','v','V','w','W','x','X','y','Y','z','Z'];

    _mockResponseData.arrayLimit = 10;

    _mockResponseData.numberRamdomLimit = 100;

    _mockResponseData.stringRamdomLimit = 100;

    _mockResponseData.isObject = (data) => (typeof data === "object" && data.constructor.name === "Object")

    _mockResponseData.isArray = (data) => (typeof data === "object" && data.constructor.name === "Array")

    _mockResponseData.generateHTML = (data) => generateHTML(data);

    var generateHTML = (data) => {
        content = '<div style="margin-left:10px">{</br>';
        for(key in data) {
            if(_mockResponseData.isObject(data[key])) {
                content += "<div style='margin-left:10px;'>"+key+ " : " + generateHTML(data[key])+",</div>";
            } else {
                content += "<div style='margin-left:10px;'>"+key+ " :  <b>" +data[key]+"</b>,</br></div>"
            }
        }
        content += '}</div>';
        return content;
    }

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

    var generateRandomString = () => {

        var length = Math.floor((Math.random() * _mockResponseData.stringRamdomLimit) + 1);

        var randomString = '';

        for(let i=0;i<length;i++) {

            let randomness = Math.floor((Math.random()*stringDen.length) + 1);

            randomString += stringDen[randomness];
        }

        return randomString;
    }

    var generateRandomNumber = () => Math.floor((Math.random() * _mockResponseData.numberRamdomLimit) + 1)

    var generateRandomBoolean = () => (Math.floor((Math.random() * _mockResponseData.stringRamdomLimit) + 1)%2)===0
    
    return _mockResponseData;
}

window.mockResponseData = mockdataresponse();

})(window);