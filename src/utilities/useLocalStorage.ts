export const useLocalStorage = <T>(key: keyof T, value: keyof T) => {
    const Prev = localStorage.getItem('Sadra');
    if (Prev && typeof Prev === 'string') {
        const prevValue = JSON.parse(Prev);
        localStorage.setItem('Sadra', JSON.stringify({ ...prevValue, key: value }));
    } else {
        localStorage.setItem('Sadra', JSON.stringify({ key: value }));
    }
}