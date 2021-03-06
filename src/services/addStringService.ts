import config from '../common/config';
const { SIMPLE_ARRAY } = config;

export const getModifiedArray = (start: string, end: string): string[] => {
    const initialArray: string[] | undefined = SIMPLE_ARRAY?.split(',');
    if (initialArray?.length) {
        if (start) {
            initialArray.unshift(start);
        };
        if (end) {
            initialArray.push(end);
        };
        return initialArray;
    } else {
        throw new Error;
    }
};