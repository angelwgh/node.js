export default {
	buildTree (array) {
		const result = [],
			  cache = {}
		for(let i = 0; i < array.length; i++){
			cache[array[i]._id] = array[i]
			if(!array[i].parentId || array[i].parentId == '0'){
				result.push(array[i])
			}
		}

		for(let k in cache){
			const parentId = cache[k].parentId
			if(parentId && parentId !== '0'){
				if(!cache[parentId].children){
					cache[parentId].children = []
				}
				cache[parentId].children.push(cache[k])
			}
		}

		return result
	}
}