
export const getReversedString = (str: string): string => {
    return str.split('').reverse().join('').replace(/[aeiou]/g, char => char.toUpperCase());
};
