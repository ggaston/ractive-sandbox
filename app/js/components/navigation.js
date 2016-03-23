import Ractive from 'ractive';
import template from '../views/navigation.html';

let navigationComponent = Ractive.extend({
		template: template,
		data() {
			return {
				options: {
					feature: 'nav feature - 1' 
				}
			}
		},
		oninit() {
			this.set('feature', 'nav feature - 2');
		}
	});

export default navigationComponent;