import Ractive from 'ractive' // Just during developement

let validationDecorator = function(node, rule, keypath){
		let rules = rule ? rule.split(',') : []		
		
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
		
		let validation = this.get('validation')
		console.log('decorator validation: %o', validation)
		console.log('decorator validation.data.data: %o', validation.data.data)
		console.log('decorator nodeInfo: %o', Ractive.getNodeInfo(node))

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

export default validationDecorator
