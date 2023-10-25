const User = require('../models/user');


module.exports.profile = function(req, res) {
        User.findById(req.params.id, function(err, user) {

            return res.render('user_profile', {
                title: "User Profile",
                profile_user: user
            });
        });
    }
    // if (req.cookies.user_id) {
    //     User.findById(req.cookies.user_id, function(err, user) {
    //         if (user) {
    //             return res.render('user_profile', {
    //                 title: "User Profile",
    //                 user: user
    //             })
    //         } else {
    //             return res.redirect('/users/sign-in');

//         }
//     });
// } else {
//     return res.redirect('/users/sign-in');

// }

module.exports.update = async function(req, res) {
    // if (req.user.id == req.params.id) {
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
    //         return res.redirect('back');
    //     });
    // } else {
    //     return res.status(401).send('Unauthorised');
    // }
    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadAvatar(req, res,
                function(err) {
                    if (err) {
                        console.log('.......multer error', err);
                    } else {
                        user.name = req.body.name;
                        user.email = req.body.email;

                        if (req.file) {
                            user.avatar = User.avatarPath + '/' + req.file.filename;
                        }
                        user.save();
                        return res.redirect('/');
                    }

                });
        } catch {
            req.flash('error');
            res.redirect('/');
        }




    } else {
        req.flash('error', 'unauthorised ');
        return res.status(401).send('unauthorised');

    }
}




// render the sign up page
module.exports.signUp = async function(req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    // console.log('sign up succesfull', user);
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = async function(req, res) {
    try {
        console.log("REQ.BODY:", req.body);
        if (req.body.password != req.body.confirm_password) {
            console.log("Password Doesnt Match", req.body.password, req.body.confirm_password);
            return res.redirect('back');
        }
        console.log("Pasword Matched");

        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            let createdUser = await User.create(req.body);
            console.log("User Created Successfully!", createdUser);
            return res.redirect('/users/sign-in')
        } else {
            console.log("User Already Exists!", user);
            return res.redirect('back')
        }
    } catch (err) {
        console.log("Error Creating User!", err);
        return res.redirect('back')
    }
}


// sign in and create a session for the user
// module.exports.createSession = function(req, res) {

//     // steps to authenticate
//     // find the user
//     User.findOne({ email: req.body.email }, function(err, user) {
//         if (err) { console.log('error in finding user in signing in'); return }
//         // handle user found
//         if (user) {

//             // handle password which doesn't match
//             if (user.password != req.body.password) {
//                 return res.redirect('back');
//             }

//             // handle session creation
//             res.cookie('user_id', user.id);
//             return res.redirect('/users/profile');

//         } else {
//             // handle user not found

//             return res.redirect('back');
//         }


//     });

module.exports.createSession = function(req, res) {
    req.flash('success', 'Logged in successfully');
    return res.redirect('/');
}





module.exports.signOut = function(req, res) {
    req.flash('success', 'logged out successfully');
    req.logout((err) => {
        if (err) {
            return res.redirect('back');
        }
        return res.redirect('/users/sign-in');
    });
    //res.cookie('user_id', null);

}