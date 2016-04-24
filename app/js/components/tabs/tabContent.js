import Ractive from 'ractive'
import tmpl from '../../views/tabContent.html'

var TabContent = Ractive.extend({
	template: tmpl,
	onrender(){
		this.parent.observe('selected', (selected) => {
				if(!selected){
					return
				}

				this.set('active', selected === this.get('name'))
			}
		)
	}
})

export default TabContent;
