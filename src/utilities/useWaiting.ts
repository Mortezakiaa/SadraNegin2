import React, { useCallback, useMemo, useState } from 'react';

export const useWaiting = (initialize = false): [boolean, (value: boolean) => void] => {
    const [wait, setWait] = useState<boolean>(initialize);

    const setWaitHandle = useCallback((value: boolean, e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
        }
        setWait(value);
    }, []);

    return [useMemo(() => {
        return wait;
    }, [wait]), setWaitHandle];
}