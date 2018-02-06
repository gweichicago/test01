var P8Schema = require('../framework/P8Schema.js'),
    DbConnections = require('../framework/DbConnections.js'),
    UserSecurityStatus = require('../enums/UserSecurityStatus.js'),
    props = {
        UserName: {type: String},
        FirstName: {type: String},
        Status: {type: String, enum: Object.keys(UserSecurityStatus), default: UserSecurityStatus.Active},
        Password: {type: String},
        Password_PBKDF2: {type: String},
        PasswordSalt: {type: String},
        PasswordIterations: {type: Number},
        PasswordExpiration: {type: Number}
    },
    UserSecuritySchema = new P8Schema(props);
exports.UserSecurity = DbConnections.p8security.model('UserSecurity', UserSecuritySchema, 'UserSecurity');