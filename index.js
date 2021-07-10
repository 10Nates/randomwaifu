const http = require('http')
const https = require('https');

function newImageURL(callback) {
    https.get('https://api.waifu.pics/sfw/waifu', (response) => {
        res = '';
        response.on('data', (chunk) => { res += chunk })

        response.on('end', () => {
            url = JSON.parse(res).url
            callback(url)
        })
    })
}

function newImageData(callback) {
    newImageURL(url => {
        https.get(url, (response) => {
            var res
            response.pipe(res)

            response.on('end', () => {
                callback([url, res])
            })
        })
    })
}


var server = http.createServer(function (req, reso) {

    newImageURL(url => {
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
