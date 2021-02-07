const requests = require("./sitereq")


class regCheck {
    check(userName) {
        let res = this.sitereq(userName);
        //console.log(res)
        if (res.indexOf('Запрашиваемый пользователь "' + userName + '" не найден.') != -1) {
            return false;
        } else {
            return true;
        }
    }
    sitereq(userName) {
        let req = new requests()
        return req.sitereq("login=" + userName + "&register=0&password=132656546464864&cookie_check=1&redirect=%2F&_xfToken=")
    }
}
module.exports = regCheck