require('dotenv').config()
const axios = require('axios')

const access_token = process.env.FB_ACCESS_TOKEN

const playlist_url_1 = process.env.PLAYLIST_URL_1
const playlist_url_2 = process.env.PLAYLIST_URL_2
const playlist_url_3 = process.env.PLAYLIST_URL_3
const playlist_url_4 = process.env.PLAYLIST_URL_4
const playlist_url_5 = process.env.PLAYLIST_URL_5

async function getPlaylist(url) {
    // return url
    let playlist = []
    await axios.get(url).then(res => {
        playlist = res.data
    })
    return playlist
}

async function getClipEngagement(url) {
    let clip = []
    await axios.get(url).then(res => {
        // console.log(JSON.stringify(res.data))
        console.log('url ', res.data.id)
        console.log('share ', res.data.engagement.share_count)
        console.log('===============================')
    }).catch(err => {
        console.log(err)
    })
}

async function getClipStat(playlist) {
    let clips = await playlist.clips.map((i) => {
        let clip_url = process.env.CHANNEL_CLIP_URL + i.id + '?pl=' + playlist.id
        let url = 'https://graph.facebook.com/v4.0/?id=' + encodeURIComponent(clip_url) +'&access_token=' + access_token + '&fields=engagement'
        return url
    })

    return clips
}

async function main() {
    let p1 = await getPlaylist(playlist_url_1)
    let p2 = await getPlaylist(playlist_url_2)
    let p3 = await getPlaylist(playlist_url_3)
    let p4 = await getPlaylist(playlist_url_4)
    let p5 = await getPlaylist(playlist_url_5)
    
    let cp1 = await getClipStat(p1.data)
    let cp2 = await getClipStat(p2.data)
    let cp3 = await getClipStat(p3.data)
    let cp4 = await getClipStat(p4.data)
    let cp5 = await getClipStat(p5.data)

    console.log('>>>>>>>>>>> ' + process.env.PLAYLIST_SLUG_1 + ' <<<<<<<<<<<<')
    await Promise.all(cp1.map(async (cp) => {
        await getClipEngagement(cp)
    }))
    console.log("")

    console.log('>>>>>>>>>>> ' + process.env.PLAYLIST_SLUG_2 + ' <<<<<<<<<<<<')
    await Promise.all(cp2.map(async (cp) => {
        await getClipEngagement(cp)
    }))
    console.log("")

    console.log('>>>>>>>>>>> ' + process.env.PLAYLIST_SLUG_3 + ' <<<<<<<<<<<<')
    await Promise.all(cp3.map(async (cp) => {
        await getClipEngagement(cp)
    }))
    console.log("")

    console.log('>>>>>>>>>>> ' + process.env.PLAYLIST_SLUG_4 + ' <<<<<<<<<<<<')
    await Promise.all(cp4.map(async (cp) => {
        await getClipEngagement(cp)
    }))
    console.log("")

    console.log('>>>>>>>>>>> ' + process.env.PLAYLIST_SLUG_5 + ' <<<<<<<<<<<<')
    await Promise.all(cp5.map(async (cp) => {
        await getClipEngagement(cp)
    })) 
}

main()