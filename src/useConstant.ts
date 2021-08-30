import { useRef } from 'react';
import {Func, FUNC_KEY} from "./definitions";

const useConstant = <T extends Function>(f: T): T => {
	const { current } = useRef<Func<T>>(
		(...args) => current[FUNC_KEY]?.(...args)
	);
	current[FUNC_KEY] = f;
	return current as any as T;
};

export default useConstant;
