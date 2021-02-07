const antiBot = require("./antiBot")



const request = require('request');
const deasync = require('deasync');


class req {
    constructor() {

    }
    sitereq(body) {
        const AB = new antiBot();
        let setings = AB.get()
        console.log(setings)
        let res = null
        request({
            url: "https://forum.r-rp.ru/login/login",
            method: "POST",
            followAllRedirects: true,
            headers: {
                "Host": "forum.r-rp.ru",
                "User-Agent": setings.userAgent,
                "Content-Type": "application/x-www-form-urlencoded",
                "Origin": "https://forum.r-rp.ru",
                "Connection": "keep-alive",
                "Referer": "https://forum.r-rp.ru/",
                "Cookie": "R3ACTLB=" + setings.R3ACTLB,
                "TE": "Trailers",
                "Upgrade-Insecure-Requests": "1",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache"
            },
            body: body
        }, function(error, response, body) {
            console.log(error)
            res = response.body;
            console.log(res)
        });
        while (res == null) {
            deasync.runLoopOnce()
            if (res != null) {
                return res;
                break;
            }
        }
    }
}
module.exports = req