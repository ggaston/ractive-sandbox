/**
 * Validation <> Validation
 * Validation.validate <> process of validation
 * Validation.validator <> validation condition  
 */

class Validation {
	constructor(data, rules){
		[this.rules, this.data] = Array.prototype.slice.call(arguments).reverse();		
	}
	
	validate(data, rules){
		this.data = this.data || data;
		this.rules = this.rules || rules;
		console.log('data: %o', data)
		console.log('rules: %o',rules)
		for(let keypath in rules){
			console.log('obj: %o', this.getObj(data, rules[keypath]));
		}
	}

	getObj(obj, keypath) {
		let pos = keypath.indexOf('.');

		if (pos === -1) {
		  // simple path, return the reference
		  return {
			object: obj,
			child: keypath
		  };

		} else {
		  // path with at least 1 child, recurse
		  // match the parent, immediate child, and remaining keypaths
		  let [match, parent, remainder, child] = keypath.match(/^([^\.]+)\.(([^\.]+).*)$/);

		  // if it doesn't exist, create it
		  if (!obj.hasOwnProperty(parent)) {
			obj[parent] = isNaN(parseInt(child)) ? {} : [];
		  }

		  return this.getObj(obj[parent], remainder);
		}
	}

	message(msg) {
		console.log(msg)
	}
}


export default Validation