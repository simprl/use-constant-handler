import { useRef, useLayoutEffect } from 'react';
import {Func, FUNC_KEY} from "./definitions";

const useHandler = <T extends Function>(f: T): Function => {
	const { current } = useRef<Func<T>>(
		(...args) => (current[FUNC_KEY] ?? f)(...args)
	);

	useLayoutEffect(() => {
		current[FUNC_KEY] = f;
	});

	return current;
};

export default useHandler;
