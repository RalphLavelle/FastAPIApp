import { IBook } from "../interfaces";

const bookManager = {
    books: [
        {
            name: "European Odyssey",
            slug: "European-odyssey"
        },
        {
            name: "Finnegan's Wake",
            slug: "finnegans-wake",
            parts: [
                {
                    index: 1,
                    chapters: 8
                },
                {
                    index: 2,
                    chapters: 4
                },
                {
                    index: 3,
                    chapters: 4
                },
                {
                    index: 4,
                    chapters: 1
                }
            ]
        }
    ],
    findBySlug: (slug: string): IBook => {
		const books = bookManager.books;
		return books.find(b => b.slug === slug)!;
	},
}

export { bookManager };