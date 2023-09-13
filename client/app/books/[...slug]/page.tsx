import Link from 'next/link'    
import styles from '../../components/styles.module.scss'
import { bookManager } from '../../components/bookManager';
import Chapter from '../../components/chapter'
import QandA from '../../components/QandA'
import TOC from '../../components/toc'

export default function books({ params }: { params: { slug: Array<string> }}) {
    
    const book = bookManager.findBySlug(params.slug[0])
    const imgSrc = `/covers/${book.slug}.jpg`
    let chapter = undefined;

    if(params.slug.length > 1) {
        chapter = {
            book: book.slug,
            partIndex: parseInt(params.slug[2]),
            chapterIndex: parseInt(params.slug[4])
        } 
    }

  	return (
        <div className={styles.layout}>
            <h1><Link href="/">Book AI</Link></h1>
            <div className={styles.section}>
                <img src={imgSrc} width="300" height="487" alt={book.name} />
                <h1>{ book.name }</h1>
                <TOC book={book}></TOC>
            </div>
            <QandA />
            { chapter 
                ? <div className={styles.heading}><h3>Part { chapter.partIndex }, chapter { chapter.chapterIndex }</h3></div>
                : null }
            { chapter ? <div className={styles.section}>
                <Chapter chapter={chapter} />
            </div> : null }
        </div>
    )
}