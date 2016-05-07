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
			}			
		}	
	},
	oninit(){
		this.on({
			'validate' : (e) => {
				this.fire('validate', e)
			}
		});
	},
	onrender(){
		let validator = new Validator();
		
		this.decorators.validator = this.get('validator').decorator 
		validator.validate(this.get(''), this.get('validation'))
	}
})

export default Form;
