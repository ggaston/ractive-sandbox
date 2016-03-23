import Ractive from 'ractive';
import template from '../views/counter.html';

let counterComponent = Ractive.extend({
		template: template,
		data() {
			return {
				options: {
					feature: 'feature - 1' 
				}
			}
		},
		oninit() {
			this.set('feature', 'feature - 2');
		}
	});

export default counterComponent;