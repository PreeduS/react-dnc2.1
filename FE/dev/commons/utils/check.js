//null safe check
//const check = (obj, predicate) => {
const check = predicate => obj => {
    if(obj === undefined || predicate === undefined){
        throw  new Error("Missing args");
    }
	let result;
	try{
		result = predicate(obj);
	}catch(e){ 
		if(e.name === 'TypeError'){
			return null;
		}
		throw e;
	}
	return result;
}

export default check;