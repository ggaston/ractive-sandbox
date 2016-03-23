import Ractive from 'ractive';
import template from '../views/counter.html';
import navigationComponent from './navigation.js';

let counterComponent = Ractive.extend({
		template: template,
		data() {
			return {
				options: {
					feature: 'feature - 1' 
				}
			}
		},
		components: {
			navigation: navigationComponent
		},
		oninit() {
			this.set('feature', 'feature - 2');
		}
	});

export default counterComponent;