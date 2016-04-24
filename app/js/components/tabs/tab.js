import Ractive from 'ractive'
import tmpl from '../../views/tab.html'

var Tab = Ractive.extend({
	template: tmpl,
	data(){
		return {
			active: false,
			disabled: false
		}
	},
	selected(){
		if(this.get('disabled')){
			return
		}
		this.parent.set('selected', this.get('name'));
	},
	onrender(){
		let container = this.container,
			self = this;

		self.parent.observe('selected', (selected) => {
			console.log('selected: %s', selected);
			let name = self.get('name')

			if(!selected){
				return;
			}

			self.set('active', name === selected)
		})
	}
})

export default Tab;
