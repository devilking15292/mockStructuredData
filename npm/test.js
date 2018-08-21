const mock = require('./index.js')
const http = require('http')

mock.mockResponseData.mock()

http.get('http://thsis.com/mock',(resp)=>{
    console.log('received response')
    console.log(resp)
});