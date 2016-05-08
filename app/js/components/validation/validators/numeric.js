function numeric(value) {

	let check = (value) => {
		return ((typeof value !== "undefined" || value !== null) || value !== '') 
	}

	return {
		required: '',
		pattern: '[0-9]',
		valid: check.call(this, value)
	}		 
}	

export default numeric
