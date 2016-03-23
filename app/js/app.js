import Ractive from 'ractive';
import template from './views/app.html';

import counterComponent from './components/counter.js';
import navigationComponent from './components/navigation.js';

Ractive.components.counter = counterComponent
Ractive.components.navigation = navigationComponent

let App = new Ractive({  
  el: '#app',
  template: template,
  data: {
    name: 'Paquitosoft'
  }
});

export default App;
