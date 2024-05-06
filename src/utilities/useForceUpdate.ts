import { useCallback, useState } from "react"

export const useForceUpdate = () => {
    const [, setForce] = useState<Object>(Object.create(null));

    return useCallback(() => {
        setForce({});
    }, []);
}