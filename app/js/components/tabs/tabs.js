import Ractive from 'ractive'
import TabNav from './tabNav'
import TabContent from './tabContent'
import tmpl from '../../views/tabs.html'

var Tabs = Ractive.extend({
	template: tmpl,
	data(){
		return {
		}
	},
	components: {
		tabNav: TabNav,
		tabContent: TabContent
	}
})

export default Tabs;
