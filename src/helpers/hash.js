var bcrypt = require('bcrypt')

module.exports.hash = {
    hash : (data, salt) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(data, salt, (err, hash) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(hash)
                }
            })
        })
    }
}