const constantsJs = require("../constants.js");
dbSwitch = async(req, res, next) => {
    try{		
		let {constants, message} = constantsJs(req);
		req.constants = constants;
		req.message = message;
		next();
    }catch(err){
    	console.log(err);
    }
}
module.exports = dbSwitch;
