const randomUseragent = require('random-useragent');
const request = require('request');
const deasync = require('deasync');

class antiBot {
    get() {
        let randomAgent = randomUseragent.getRandom();
        var res = this.test(randomAgent)
        return res

    }
    test(randomAgent, cook = "test") {
        if (cook == "test") {
            let res = null
            request({
                url: "https://forum.r-rp.ru/login/login",
                method: "POST",
                followAllRedirects: true,
                headers: {
                    "Host": "forum.r-rp.ru",
                    "User-Agent": randomAgent,
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Origin": "https://forum.r-rp.ru",
                    "Connection": "keep-alive",
                    "Referer": "https://forum.r-rp.ru/",
                    "TE": "Trailers",
                    "Upgrade-Insecure-Requests": "1",
                    "Pragma": "no-cache",
                    "Cache-Control": "no-cache"
                },
                body: ""
            }, function(error, response, body) {
                res = response.body;
            });
            while (res == null) {
                deasync.runLoopOnce()
                if (res != null) {
                    res = res.split("R3ACTLB=")[1]
                    let val = res.split(" ; ")[0]
                    return { R3ACTLB: val, userAgent: randomAgent };
                    break;
                }
            }
        } else {
            let res = null
            request({
                url: "https://forum.r-rp.ru/",
                method: "GET",
                followAllRedirects: true,
                headers: {
                    "Host": "forum.r-rp.ru",
                    "User-Agent": randomAgent,
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Origin": "https://forum.r-rp.ru",
                    "Connection": "keep-alive",
                    "Referer": "https://forum.r-rp.ru/",
                    "Cookie": "R3ACTLB=" + cook,
                    "TE": "Trailers",
                    "Upgrade-Insecure-Requests": "1",
                    "Pragma": "no-cache",
                    "Cache-Control": "no-cache"
                },
                body: ""
            }, function(error, response, body) {
                console.log(cook)
                res = response.body
            });



            while (res == null) {
                deasync.runLoopOnce()
                if (res != null) {
                    return true;
                    break;
                }
            }
        }
    }
}
module.exports = antiBot