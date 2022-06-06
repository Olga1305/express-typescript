export interface Countries {
    getAll: string,
    getFiltered: (filter: string) => string;
    getOrdered: (order: string) => string;
    getFilteredAndOrdered: (filter: string, order: string) => string;
}

export interface Reverse {
    getReversedString: (str: string) => string;
}

export interface Append {
    appendToStart: (start: string) => string;
    appendToEnd: (end: string) => string;
    appendToStartAndToEnd: (start: string, end: string) => string;
}