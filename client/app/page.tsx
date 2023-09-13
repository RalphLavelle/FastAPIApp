import Link from 'next/link';
import styles from './components/styles.module.scss'

export default async function Home() {
  
  return (
    <div className={styles.layout}>
      <div className={styles.section}>
        <h1>Book AI</h1>
        <h2>AI-assisted Q&A and photos in books</h2>
        {/* <h3><a href="http://showyourkidstheworld.com">European Odyssey</a>, by Ralph Lavelle</h3> */}
        <h3><Link href="/books/finnegans-wake">Finnegan's Wake</Link>, by James Joyce</h3>
      </div>
      <footer>
        This is a NextJS (front-end) app, using FastApi as its (Python) back-end. It takes a pre-trained large language model and fine-tunes it on the text of James Joyce's <i>Finnegan's Wake</i> to allow Q&A on the book's text.
      </footer>
    </div>
  )
}