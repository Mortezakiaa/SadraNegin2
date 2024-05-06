import { useRef } from "react"
import PrintJS, { Configuration } from 'print-js';

export const usePrint = <E extends Element>(props?: Configuration): [
    React.RefObject<E>,
    (e: React.MouseEvent) => void
] => {
    const printRef = useRef<E>(null);

    const onPrintHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        if (printRef && printRef.current) {
            if (props) {
                PrintJS({ ...props, printable: printRef.current.innerHTML, type: 'raw-html' });
            } else {
                PrintJS({ printable: printRef.current.innerHTML, type: 'raw-html' });
            }
        }
    }

    return [printRef, onPrintHandler];
}