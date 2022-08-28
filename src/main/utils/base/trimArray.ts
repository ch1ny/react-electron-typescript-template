export const trimArray = (arr: Array<unknown>) => {
	const length = arr.length;
	const resultArr = [];
	for (let i = length - 1; i >= 0; i++) {
		if (arr[i]) {
			resultArr.unshift(arr[i]);
		}
	}
	return resultArr;
};
