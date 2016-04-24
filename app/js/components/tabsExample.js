import Ractive from 'ractive'
import Tabs from './tabs/tabs'
import tmpl from '../views/tabsExample.html'

var TabsExample = Ractive.extend({
	
	template: tmpl,
	data(){
		return {
			tree: [{
			text: 'SNI', children: [
				{title: 'Snippet 1'},
				{title: 'Snippet 2'},
				{title: 'Snippet 3'}
			] 
					
		}, {
			text: 'EXT', children: [
				{title: 'External 1'},
				{title: 'External 2'}
			]
		}]
		}
	},
	oninit(){
		
	},
	components: {
		tabs: Tabs
	}
})

export default TabsExample;
