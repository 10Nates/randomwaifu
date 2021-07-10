const http = require('http')
const https = require('https');
const qs = require('querystring')

function newImageURL(n, callback) {
    https.get(`https://api.waifu.pics/${n ? 'n' : ''}sfw/waifu`, (response) => {
        res = '';
        response.on('data', (chunk) => { res += chunk })

        response.on('end', () => {
            url = JSON.parse(res).url
            callback(url)
        })
    })
}

var server = http.createServer(function (req, reso) {

    var adult = qs.parse(req.url.replace('/?', '')).nsfw
    var n = (adult === 'iam18plus' ? true : false)

    newImageURL(n, url => {
        https.get(url, (response) => {
            var typef = url.split(/\./g)
            typef = typef[typef.length - 1]
            var type = 'image';
            if (typef === 'png') type = 'image/png'
            else if (typef.match(/jpg|jpeg|jfif/g)) type = 'image/jpeg'
            else if (typef === 'webp') type = 'image/webp'

            reso.writeHead(200, { 'Content-Type': type });
            response.on('data', chunk => reso.write(chunk))

            response.on('end', () => {
                reso.end()
            })
        })
    })

}).listen(process.env.PORT || 5000);

server.on('error', err => console.error(err))
server.on('close', () => console.log('Get relay server closed'))
