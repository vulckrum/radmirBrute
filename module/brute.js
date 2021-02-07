const requests = require("./sitereq")
class ckeckLP {
    check(lp) {
        let laginPass = lp.split(":")
        let req = new requests()
        let res = req.sitereq("login=" + laginPass[0] + "&register=0&password=" + laginPass[1] + "&cookie_check=1&redirect=%2F&_xfToken=")

        if (res.indexOf('Неверный пароль. Пожалуйста, попробуйте ещё раз.') != -1) {
            return false;
        } else {
            return true;
        }
    }
}
module.exports = ckeckLP