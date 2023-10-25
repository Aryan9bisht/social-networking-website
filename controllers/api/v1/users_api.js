const User = require('../../../models/user');
const jwt = require('jsonweebtoken');

module.exports.createSession = async function(req, res) {

    try {
        let user = await user.findOne({ email: req.body.email });
        if (!user || user.password != req.body.password) {
            return res.json(422, {
                message: 'invalid username or password'
            });

        }
        return res.josn(200, {
            message: 'succesfully logged in here is your token',
            data: jwt.sign(user.toJSON(), 'codeial', { expiresIn: '100000' })
        })
    } catch (err) {
        console.log('*****error', err);
        return res.json(500, {
            message: 'error found'
        });
    }


}