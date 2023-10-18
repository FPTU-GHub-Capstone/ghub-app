export function throwFirebaseError() {
	return function(proto: unknown, fnName: string, propDesc: PropertyDescriptor): any {
		const originFn = propDesc.value;
		const className = (<any>proto).constructor.name;
		assertApplyToFunction(originFn);
		propDesc.value = async function(...args: unknown[]) {
			return callOriginalFunction.call(this, { originFn, args, fnName, className });
		};
		return propDesc;
	};
}

function assertApplyToFunction(target: unknown): void {
	if (!(typeof target === 'function')) {
		throw new Error('This decorator must apply to class method');
	}
}

async function callOriginalFunction(this: any, options: any) {
	let result: any;
	const { originFn, args, fnName, className } = options;
	try {
		result = await originFn.apply(this, args);
		return result; 
	} catch (error: any) {
		const errorCode = error.code;
		const errorMessage = error.message;
		console.error({errorCode, errorMessage});
		throw new Error(`Firebase error: ${className}.${fnName}`);
	}
}
