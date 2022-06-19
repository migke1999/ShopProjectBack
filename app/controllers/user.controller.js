
const mysql = require('mysql');
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "1234",
    database: "Shopping",
});


exports.getAllUsers = (req, resp, next) =>{
    
    db.query(
        "select   userid, lastname, firstname," +
        "email, birthday, permission FROM users; ",
        (err, result) => {
            if (err) {
                console.log(err);
            }
            resp.json(result);
        }
    )
};

exports.getUserById = (req, resp, next) =>{
    const name = req.query.name;

    db.query(
        "select   userid, lastname, firstname, email, birthday, permission, convert(aes_decrypt(passuser, '1234')using utf8) AS passuser FROM users WHERE firstname='" + name + "';"
        , (err, result) => {
            if (err) {
                console.log(err);
            }
            resp.json(result);

        }
    )
};


exports.createUser = (req, resp, next) =>{

    
    const response = { error: false, msg: "Everything ok!", data: null }

    if (req.body.firstname && req.body.email && req.body.passuser
        && req.body.permission) {



        let firstname = req.body.firstname
        let lastname = req.body.lastname
        let email = req.body.email
        let birthday = req.body.birthday
        let permission = req.body.permission
        let passuser = req.body.passuser

        console.log("nombre: " + firstname + " apellido: " + lastname + " cumpleaños:" + birthday
            + " permisos: " + permission);


        db.query("INSERT INTO users (lastname, firstname, email, birthday, permission, passuser)" +
            "values('" + lastname + "', '" + firstname + "', '" + email + "', '" + birthday + "', " + permission + ", AES_ENCRYPT('" + passuser + "', '1234'));",
            (err, res) => {
                if (err) {
                    console.log(err)
                }
            })

    }
    resp.json(response);
};

exports.updateUser = (req, resp, next) =>{

    
    const response = { error: false, msg: "Everything ok!", data: null }

    if (req.body.firstname && req.body.email && req.body.passuser
        && req.body.permission) {


        let userid = req.body.userid
        let firstname = req.body.firstname
        let lastname = req.body.lastname
        let email = req.body.email
        let birthday = req.body.birthday
        let permission = req.body.permission

        console.log("id: " + userid + " nombre: " + firstname + " apellido: " + lastname
            + " cumpleaños:" + birthday
            + " permisos: " + permission);


        db.query("UPDATE  users " +
            "SET lastname = '" + lastname + "', firstname = '" + firstname + "',email = '" + email + "'," +
            " birthday = '" + birthday + "',permission =" + permission + " WHERE userid = " + userid + ";",
            (err, res) => {
                if (err) {
                    console.log(err)
                }
            })
    }
    resp.json(response);
};

exports.deleteUser = (req, resp, next) =>{
    const id = req.query.id;

    db.query(
        "DELETE FROM users WHERE userid='" + id + "';"
        , (err, result) => {
            if (err) {
                console.log(err);
            }
            resp.json(result);

        }
    )
};