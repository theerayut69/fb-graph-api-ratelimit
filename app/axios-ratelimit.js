require('dotenv').config()
const axios = require('axios')

let id = process.env.URL
let access_token = process.env.FB_ACCESS_TOKEN
let url = 'https://graph.facebook.com/v4.0/?id=' + id +'&access_token=' + access_token + '&fields=engagement'

axios.get(url).then(res => {
    console.log(res.data)
}).catch(err => {
    console.log(err)
})