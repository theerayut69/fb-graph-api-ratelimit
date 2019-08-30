require('dotenv').config()
const axios = require('axios')

const app_id = process.env.FB_APP_ID
const app_secret = process.env.FB_APP_SECRET

const get_access_token = async () => {
    let access_token = []
    await axios.get('https://graph.facebook.com/oauth/access_token', {params: {
        client_id: app_id,
        client_secret: app_secret,
        grant_type: 'client_credentials'
    }}).then(res => {
        access_token = res.data
    }).catch(err => {
        console.log(err)
    })
    return access_token
}

const main = async () => {
    let ac = await get_access_token()
    console.log(ac)
}

main()