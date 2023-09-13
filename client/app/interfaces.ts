export interface IBook {
    name: string;
    slug: string;
    parts?: Array<IBookPart>
}

export interface IBookPart {
    index: number;
    chapters: number
}

export interface IBookChapter {
    book: string; // slug
    chapterIndex: number;
    partIndex: number;
}