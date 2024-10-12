export default function useDebounce (func, delay) {
    let timeout = null;

    return(...args) => {
        return new Promise( ( resolve, reject ) => {
            clearTimeout(timeout);

            timeout = setTimeout( () => {
                try {
                    const output = func(...args);
                    resolve( output );
                } catch ( err ) {
                    reject( err );
                }
            }, delay);
        })
    }
}