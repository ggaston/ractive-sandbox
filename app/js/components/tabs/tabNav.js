import Ractive from 'ractive'
import Tab from './tab'
import tmpl from '../../views/tabNav.html'

var TabNav = Ractive.extend({
	template: tmpl,
	data(){
		return {
		}
	},
	components: {
		tab: Tab
	}
})

export default TabNav;
