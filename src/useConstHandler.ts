import { useRef, useLayoutEffect } from 'react';
import {Func, FUNC_KEY} from "./definitions";

const useConstHandler = <T extends Function>(f: T): T => {
	const { current } = useRef<Func<T>>(
		(...args) => (current[FUNC_KEY] ?? f)(...args)
	);

	useLayoutEffect(() => {
		current[FUNC_KEY] = f;
	});

	return current as any as T;
};

export default useConstHandler;
