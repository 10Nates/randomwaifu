fetch('https://api.waifu.pics/sfw/waifu').then(res => {
    res.blob().then(b => {
        b.text().then(t => {
            window.location.href = JSON.parse(t).url
        })
    })
})
