import Ractive from 'ractive' // Just during developement 

/**
 * Validation <> Validation
 * Validation.validate <> process of validation
 * Validation.validator <> validation condition  
 */

class SuperValidation {
	constructor(data, rules){
		[this.rules, this.data] = Array.prototype.slice.call(arguments).reverse();		
	}

	message(msg) {
		console.log(msg)
	}
}


export default SuperValidation