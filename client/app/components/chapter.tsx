import styles from './styles.module.scss'
import { IBookChapter } from '../interfaces';
require('dotenv').config()
import Image from 'next/image'

async function getText(chapter: IBookChapter): Promise<string> {
    const baseEndpoint = process.env.SERVER_ENDPOINT;
    const endpoint = `${baseEndpoint}/books/${chapter.book}/parts/${chapter.partIndex}/chapters/${chapter.chapterIndex}`;
    const response = await fetch(endpoint!, {
        method: 'GET'
    });
    const data = await response.json();
    return data
}

export default async function Chapter(props: { chapter: IBookChapter }) {

    const chapterText = await getText(props.chapter);
    const markup = { __html: chapterText };

    return (
        <div className={styles.chapter}>
            { chapterText
                ? <div dangerouslySetInnerHTML={markup}></div>
                : <div className={styles.loading}>
                    <Image src="/spinner.svg" width="40" height="40" alt="Thinking" />
                    <span>Thinking...</span>
                </div> }
        </div>
    )
}