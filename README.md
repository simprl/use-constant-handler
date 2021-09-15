# use-constant-handler
React hooks for make constant pointer to function/handler

[![](https://img.shields.io/npm/l/use-constant-handler.svg?style=flat)](https://github.com/simprl/use-constant-handler/blob/main/LICENSE)
[![](https://img.shields.io/npm/v/use-constant-handler.svg?style=flat)](https://www.npmjs.com/package/use-constant-handler)

# Usage

```jsx
import { useConstHandler } from "use-constant-handler";

const Component = ({ onEvent, onInit }) => {
    // pointer to onInit callback can changed, but pointor to initHandler not change
    const onInitHandler = useConstFunc(() => onInit());
    useEffect(() => {
        onInitHandler();
    }, [onInitHandler]); //call only once becouse initHandler not change


    // We do not need redraw input when onEvent callback change.
    // New onEvent callback need only when SubComponent call onEvent.
    // Pointer to onChange callback can changed,
    // but pointor to onChangeHandler not change
    const onEventHandler = useConstHandler((e) => onEvent(e))
    return <SubComponent onEvent={onEventHandler}/>;
}
```

### Usage with Typescript

### Source code of useConstFunc:
```js
const useConstFunc = (f) => {
	const { current } = useRef((...args) => current[FUNC_KEY]?.(...args));
	current[FUNC_KEY] = f;
	return current;
};
```

### Source code of useConstHandler:
```js
const useConstHandler = (f) => {
    const { current } = useRef((...args) => (current[FUNC_KEY] ?? f)(...args));

    useLayoutEffect(() => {
        current[FUNC_KEY] = f;
    });

    return current;
};
```
