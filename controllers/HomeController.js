const { query } = require( '../helpers/db.js' );

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

		async function getData() {
		  	let userList = await userData()
		  	let activityList = await activityData()

			res.render('index', { data: userList ,title:'789'});
		}

		getData();  	
        
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
}
