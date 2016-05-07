import Ractive from 'ractive' // developement

/**
 * Validation <> Validation
 * Validation.validate <> process of validation
 * Validation.validator <> validation condition  
 */

class Validation {
	constructor(rules){
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

	decorator() {
		let self = this 

		return function(node) {
			let [rule, keypath] = Array.prototype.slice.call(arguments, 1).reverse();

		let rules = rule ? rule.split(',') : [],
			modelRules = this.get('validation') || null

		console.log('Validation validity: %o', this)
		console.log('self: %o', self)

	    /*
	     * Resolve rules
	     */
	    	
		// 1. Only rule => skip model
		// 2. Only keypath => read model (in this case rule can be pre-defined:string or custom:object {name,pattern,errorMessage,valid})
		// 3. Keypath and rules => update data - Make sense?	

		console.log('validate rules %o', modelRules)
		// Update model rules from decorator

		// Validators part
		if(rules.indexOf('numeric') > -1){
			console.log('decorator node must be numeric: %o', node);
			node.setAttribute('pattern', '[0-9]');	
		}

		if(rules.indexOf('required') > -1){
			console.log('decorator node is required: %o', node);
			node.setAttribute('required', '');
		}


		console.log('decorator node: %o', node);
		console.log('decorator rules: %o', rules);
		console.log('decorator keypath: %o', keypath);
		console.log('decorator this: %o', this)
		 
		let modelValidation = this.get('validation')
		console.log('decorator validation: %o', modelValidation)
		console.log('decorator nodeInfo: %o', Ractive.getNodeInfo(node))

		// Constraint validate

		this.on('validate', (e) => {
			console.log('validate.call')
			let check = node.checkValidity()
			console.log('check.validity: %o', check)
			console.log('validity: %o', node.validity)

			if(!node.validity.valid){
				console.log('node validationMessage: %s', node.validationMessage)
				if(!node.nextSibling || node.nextSibling.className !== 'validation-error') {
					node.insertAdjacentHTML('afterend', '<span class="validation-error">'+ node.validationMessage +'</div>');					
				} else {
					node.nextSibling.textContent = node.validationMessage;
				}
			} else {
				if(node.nextSibling && node.nextSibling.className === 'validation-error'){
					node.parentNode.removeChild(node.nextSibling);
				}
			}
		})

		// Revalidate on change
		node.addEventListener('change', (e) => {
			if(!node.validity.valid){
				console.log('node validationMessage: %s', node.validationMessage)
				if(!node.nextSibling || node.nextSibling.className !== 'validation-error') {
					node.insertAdjacentHTML('afterend', '<span class="validation-error">'+ node.validationMessage +'</div>');					
				} else {
					node.nextSibling.textContent = node.validationMessage;
				}
			} else {
				if(node.nextSibling && node.nextSibling.className === 'validation-error'){
					node.parentNode.removeChild(node.nextSibling);
				}
			}
		})

		let methods = {
			validate: function(el){
				console.log('decorator validate.method')
			}	
		}
		
		return {
			validate: function(el){
				methods.validate(el)
			},
			teardown: function(){
				console.log('teardown');
			}
		}
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