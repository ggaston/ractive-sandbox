import Ractive from 'ractive'
import Validator from './validator'


var Form = Ractive.extend({
	template: '{{>content}}',
	data(){
		return {
			data:{
				title: 'title value',
				list: 'list value',
				lang: ['en-ww','es-es','de-de','fr-fr','fr-ch'],
			},
			validation: {
				'data.lang': 'isRequired, isUrl'
			},
			validator: new Validator()
		}	
	},
	onconfig(){
		this.decorators.validator = this.get('validator').decorator 
	},
	onrender(){
		let validator = this.get('validator');

		validator.validate(this.get(''), this.get('validation'))
	}

})

export default Form;
