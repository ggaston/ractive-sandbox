import Ractive from 'ractive';
import Form from './components/form/form';
import template from './views/form/form.html';


let App = new Ractive({  
  el: '#form',
  template: template,
  data: {
    name: 'Name value'
  },
  components: {
  	'cms-form': Form
  }
});

export default App;
