db.createUser({
    user:"bootaka123",
    pwd:"123456",
    customData:{
        name:'Chen',
        email:'bootaka123@gmail.com',
        age:18
    },
    roles:[
        {
            role:'readWrite',
            db:"company"
        },
        'read'
    ]
})

db.system.users.remove({user:'bootaka123'})

// mongo -u <username> -p <pwd> 127.0.0.1:27017/admin
// mongo -u bootaka123 -p 123456 127.0.0.1:27017/admin

db.auth('bootaka123','123456')
