import Ractive from 'ractive' // developement
import requiredValidator from './validators/required' // developement
import numericValidator from './validators/numeric' // developement

/**
 * Validation <> Validation
 * Validation.validate <> process of validation
 * Validation.validator <> validation condition  
 */

class Validation {
	constructor(rules){
		[this.rules, this.data] = Array.prototype.slice.call(arguments).reverse();

		this.validators = {
			required : requiredValidator,
			numeric : numericValidator
		}

		this.registerValidators(this.rules)
		console.log('Registererd validators: %o', this.validators)
	}

	registerValidators(rules){
		let validators = [];

		for(let keypath in rules){
			if(typeof rules[keypath] === 'string'){
				validators = rules[keypath].split(',').map(this.customValidator, this)
			}
			if(Array.isArray(this.rules[keypath])){ 
				validators = rules[keypath].map(this.customValidator, this)
			}
			 validators.forEach((validator) => {
			 	if(validator){
			 		this.validators[validator.name] = validator.obj		 		
			 	}
			})
		}
	}

	customValidator(rule){
		let validator;

		console.log('setValidator rule: %o', rule)
		if(typeof rule.valid === 'function' && rule.name){
			console.log('setValidator will build validator from: %o', rule)
			// Build validator
			//validator = 'dummy ' + rule.name + ' value';
			validator = this.buildValidator(rule);
			console.log('validator is: %o', validator)
		} else {
			console.log('setValidator detect if validator registered: %o', rule)
			// Check if validator already registered
			if(!this.validators[rule.trim()]){
				throw new Error('Validator ' + rule.trim() + ' not defined.')
			} else {
				return false;
			}
		}

		return { 
			name: rule.name,
			obj: validator 
		}

	}

	buildValidator(rule) {
		
		let validator = Object.assign({}, rule);
		delete validator.name;

		return function(value){
			console.log('Building validator -> rule %o', rule);
			console.log('Building validator -> value: %s', value);
			console.log('Building validator -> validation function: %o', rule.valid.call(validator, value));
			if(rule.valid){
				validator.valid = rule.valid.call(validator, value)
			} 
			console.log('Building validator -> validator.valid: %s', validator.valid);

			return validator;
		}
	}

	/**
	 * 
	 * Validate date
	 * @description Use only valid property of validator
	 * @param  {[type]} data  [description]
	 * @param  {[type]} rules [description]
	 * @return {[type]}       [description]
	 */
	validate(data, rules){

		this.data = this.data || data;
		this.rules = this.rules || rules;
		let self = this,
			validators,
			keypathValue,
			queue = [],
			result;

		//console.log('data: %o', data)
		//console.log('rules: %o', rules)
		//console.log('this.rules: %o', this.rules)
		//console.log('this: %o', this)
		for(let keypath in this.rules){
			keypathValue = this.getObj(data, keypath);
			validators = this.validatorsToArray(this.rules[keypath]);
			//console.log('obj: %o from keypath: %o', this.getObj(data, keypath), keypath);
			//console.log('Validators strings: %o', validators);
			//console.log('Validators: %o', self.validators);
			console.log('Validators value: %o', keypathValue.data[keypathValue.child]);
			//Array of validators which have to be applied on each keypath
			result = validators.map((validator) => {
				queue.push({[validator] : keypath});
				return self.validators[validator](keypathValue.data[keypathValue.child]);
			})
			
			console.log('validation result: %o', result);
		}
			// check validity

		/**
		 * Build array of paths
		 */
		
		console.log(queue)
		let seq = self.sequence(queue);
		seq.then(function(response){
			// Response is just last validation function
			console.log('Then: %o', response)
		})
		
		
	}

	sequence(arr){
		let self = this;

		return arr.reduce((promise, validator) => {
			return promise.then(() => {
				let key = Object.keys(validator)[0],
					keypathValue = self.getObj(self.data, validator[key]);

				console.log('Key: %s', key)
				return self.validators[key](keypathValue.data[keypathValue.child])
			})

		}, Promise.resolve())
	}

	// Rules can be mixed array with objects and strings. Or comma separated strings.
	validatorsToArray(rules){
		let _validators = rules,
			validatorsArray;

		if(Array.isArray(rules)){
			_validators = rules.reduce((validatorNames, validator) => {
				let _validator = validator.name || validator;
				return !validatorNames ? _validator : validatorNames + ',' + _validator;
			})
		}
		validatorsArray = _validators.split(',')

		return validatorsArray
	}

	decorator() {
		let self = this

		return function(node) {
			let [rules, keypath] = Array.prototype.slice.call(arguments, 1).reverse(),
				validator;

			rules = rules ? rules.split(',') : [rules]
			rules.forEach((rule) => {
				validator = typeof self.validators[rule] === 'function' ? self.validators[rule]() : null;

				console.log('Decorator validators: %o', self.validators)
				console.log('Decorator keypath: %o', keypath)

				if(validator){
					//node.setAttribute('pattern', '[a-z]');
					for(let key in validator){

						// Use everything apart from valid and errorMessage property. Validation is done by browser itself	 
						if(key === 'valid'){
							break;
						}
						if(key === 'errorMessage'){
							break;
						}
						if(key === 'pattern'){
							// Cumulate patterns
							if(node.getAttribute(key)){
								node.setAttribute(key, node.getAttribute(key) + '|' + validator[key]);
							} else {
								node.setAttribute(key, validator[key]);	
							}
							break;
						}
						// DOM attribute have higher priority
						if(!node.getAttribute(key)){
							console.log('Decorator: Set attribute %s to %o', key, validator[key])
							node.setAttribute(key, validator[key]);						
						}	
					}				
				}

			})

			// PROBABLY OBSOLETE: Merge constraint from DOM and model
			if(keypath && validator){
			console.log('Decorator self.rules[]: %o', validator)
			console.log('Decorator errorMessage: %o', validator.errorMessage)
				if(validator.pattern){
					//set pattern
				}
				if(validator.errorMessage){
					//set custom message
					// node.setCustomValidity(validator.errorMessage);
				}
				if(validator.name && validator.valid){
					//set custom validator and check it
				}
			}

			console.log('Validation validity: %o', this)
			console.log('self: %o', self)

		    /*
		     * Resolve rules
		     */
		    	
			// 1. Only rule => skip model
			// 2. Only keypath => read model (in this case rule can be pre-defined:string or custom:object {name,pattern,errorMessage,valid})
			// 3. Keypath and rules => update data - Make sense?
			// 
			// 
			//  constraint value => model value => validate

			// Validators part
			/*if(rules.indexOf('numeric') > -1){
				console.log('decorator node must be numeric: %o', node);
				node.setAttribute('pattern', '[0-9]');	
			}

			if(rules.indexOf('required') > -1){
				console.log('decorator node is required: %o', node);
				node.setAttribute('required', '');
			}*/

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
				console.log('validity: %o', node.validity)
				self.showDomMessage(node, validator)
			})

			// Revalidate on change
			node.addEventListener('change', (e) => {
				self.showDomMessage(node, validator)
			})

			
			return {
				teardown: function(){
					console.log('teardown');
				}
			}
		}
		
	}

	showDomMessage(node, validator) {
		node.setCustomValidity('');
		if(!node.validity.valid){
			console.log('node validationMessage: %s', node.validationMessage)
			if(validator && validator.errorMessage){
			console.log('node validator error message: %s', validator.errorMessage)
				node.setCustomValidity(validator.errorMessage);
			}
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
	}

	getObj(obj, keypath) {
		let pos = keypath.indexOf('.');

		if (pos === -1) {
		  // simple path, return the reference
		  return {
			data: obj,
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