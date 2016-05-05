import Ractive from 'ractive'

class validator {
	constructor(data, rules){
		
	}

	decorator(node, keypath){
		/**
		 * Map of
		 */
		let attrMap = {
			isRequired: {attribute: 'require'}
		}

		node.setAttribute('required', '');
		//node.setAttribute('pattern', '[a-z]');



		console.log('decorator node: %o', node);
		console.log('decorator keypath: %o', keypath);
		console.log('decorator this: %o', this)

		let validation = this.get('validation')
		console.log('decorator validation: %o', validation)
		console.log('decorator nodeInfo: %o', Ractive.getNodeInfo(node))
		
		return {
			teardown: function(){
				console.log('teardown');
			}
		}
	}
	
	validate(data, rules){
		this.data = data;
		this.rules = rules;
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
}


export default validator