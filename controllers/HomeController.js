const { query } = require( '../helpers/db.js' );
const jwt = require('jsonwebtoken');


module.exports = class IndexController {

    index(req, res ,next) {

		async function userData( ) {
		  	let sql = 'SELECT * FROM user'
		  	let dataList = await query( sql )
		  	return dataList
		}
		async function activityData( ) {
		  	let sql = 'INSERT INTO activity (name) VALUES (999)'
		  	let dataList = await query( sql )
		  	return dataList
		}

		async function main() {
		  	let userList = await userData()
		  	let activityList = await activityData()

			res.render('index', { data: userList ,title:'789'});
		}

		main();  	
        
    }

	test(req, res ,next) {

		async function getData() {
		  	let sql = 'SELECT * FROM user'
		  	let dataList = await query( sql )

			res.json(dataList);
		}

		getData();  
    }

	login(req, res ,next) {
		async function getData() {
		  	let sql = `SELECT id FROM user where name = ?`;
		  	let val = req.query.name;
		  	let user = await query( sql ,val)

		  	if (user) {

		        req.session.regenerate(function(err) {
		            if(err){
		                return res.json({ret_code: 2, ret_msg: '登录失败'});                
		            }
		            
		            req.session.userid = user[0].id

		            res.json({ret_code: 0, ret_msg: '登录成功'});                           
		        });

		  	}

		}

		getData();  
    }
	check(req, res ,next) {
  		res.json([req.session.userid]);

    }

	logout(req, res ,next) {
				
  		req.session.destroy();
  		res.json([req.session.userid]);
    }	

    jwt_login(req, res ,next){
		var token = jwt.sign({ user: 'mark' }, process.env["jwt_secret"], { expiresIn: 15 }); //15秒
		res.json([token]);
    }
    jwt_verify(req, res ,next){
	    var decoded = jwt.verify(req.query.token, process.env["jwt_secret"]);
	    // console.log('decoded = '+decoded);
	    res.json([decoded]);
    }
}
