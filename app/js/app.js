import Ractive from 'ractive';
import TabsExample from './components/tabsExample';
import template from './views/app.html';


import counterComponent from './components/counter.js';
//import navigationComponent from './components/navigation.js';

Ractive.components.counter = counterComponent
//Ractive.components.navigation = navigationComponent

let App = new Ractive({  
  el: '#app',
  template: template,
  data: {
    name: 'Name value'
  },
  components: {
  	TabsExample
  }
});

App.findComponent('navigation').set('feature', 'injected')
//App.findComponent('navigation').fire('injection')

// Just for the case you need to hack from console
window.App = App;

export default App;
