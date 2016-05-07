import Ractive from 'ractive'
import Validation from './../validation/validation'
import validationDecorator from './../validation/validationDecorator'

var Form = Ractive.extend({
	template: '<form>{{>content}}</form>',
	data(){
		return {
			data:{
				owner: 'owner value',
				count: '2',
				title: 'title value',
				list: 'list value',
				lang: ["aa-xx","ab-xx","ae-xx","af-xx","ak-xx","am-xx","an-xx","ar-xx","as-xx","av-xx","ay-xx","az-xx","ba-xx","be-xx","bg-xx","bh-xx","bi-xx","bm-xx","bn-xx","bo-xx","br-xx","bs-xx","ca-xx","ce-xx","ch-xx","co-xx","cr-xx","cs-xx","cu-xx","cv-xx","cy-xx","da-xx","de-xx","dv-xx","dz-xx","ee-xx","el-xx","en-ww","en-ww","en-ca","en-eu","eo-xx","es-xx","et-xx","eu-xx","fa-xx","ff-xx","fi-xx","fj-xx","fo-xx","fr-xx","fy-xx","ga-xx","gd-xx","gl-xx","gn-xx","gu-xx","gv-xx","ha-xx","he-xx","hi-xx","ho-xx","hr-xx","ht-xx","hu-xx","hy-xx","hz-xx","ia-xx","id-xx","ie-xx","ig-xx","ii-xx","ik-xx","io-xx","is-xx","it-xx","iu-xx","ja-xx","jv-xx","ka-xx","kg-xx","ki-xx","kj-xx","kk-xx","kl-xx","km-xx","kn-xx","ko-xx","kr-xx","ks-xx","ku-xx","kv-xx","kw-xx","ky-xx","la-xx","lb-xx","lg-xx","li-xx","ln-xx","lo-xx","lt-xx","lu-xx","lv-xx","mg-xx","mh-xx","mi-xx","mk-xx","ml-xx","mn-xx","mo-xx","mr-xx","ms-xx","mt-xx","my-xx","na-xx","nb-xx","nd-xx","ne-xx","ng-xx","nl-xx","nn-xx","no-xx","nr-xx","nv-xx","ny-xx","oc-xx","oj-xx","om-xx","or-xx","os-xx","pa-xx","pi-xx","pl-xx","ps-xx","pt-xx","qu-xx","rm-xx","rn-xx","ro-xx","ru-xx","rw-xx","sa-xx","sc-xx","sd-xx","se-xx","sg-xx","sh-xx","si-xx","sk-xx","sl-xx","sm-xx","sn-xx","so-xx","sq-xx","sr-xx","ss-xx","st-xx","su-xx","sv-xx","sw-xx","ta-xx","te-xx","tg-xx","th-xx","ti-xx","tk-xx","tl-xx","tn-xx","to-xx","tr-xx","ts-xx","tt-xx","tw-xx","ty-xx","ug-xx","uk-xx","ur-xx","uz-xx","ve-xx","vi-xx","vo-xx","wa-xx","wo-xx","xh-xx","yi-xx","yo-xx","za-xx","zh-xx"],
			},
			validation: new Validation({
				'data.title': 'required, numeric',
				'data.title': 'required',
				'data.owner': 'reqiured',
				'data.lang': 'reqiured'				 
			})
		}	
	},
	decorators: {
		validation: validationDecorator
	},
	onconfig(){
		let validation = this.get('validation');

		validation.validate(this.get(''))		
	},
	oninit(){
	},
	syntheticValidate(){
		console.log(this)
		console.log(Ractive.decorators)
		this.decorators.validation.validate()
	},
	validate(e){
		this.fire('validate', e)
	}
})

export default Form;
