function required(value) {

	let check = (value) => {
		return ((typeof value !== "undefined" || value !== null) || value !== '') 
	}

	return {
		required: '',
		errorMessage: 'Pole je povinne',
		valid: check.call(this, value)
	}		 
}	

export default required
