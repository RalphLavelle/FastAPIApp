'use client'
import { IBook } from "../interfaces";
import styles from './styles.module.scss'
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TOC(props: { book: IBook }) {

    const [showTOC, setShowTOC] = useState(false)
    const [buttonText, setButtonText] = useState("Table of contents")

    useEffect(() => {}, [buttonText])

    const toggleTOC = (e: any) => {
        if(showTOC) {
            setButtonText("Table of contents");
        } else {
            setButtonText("Hide");
        }
        setShowTOC(!showTOC)
    }

    return (
        <>
            <div className={styles.toc}>
                { showTOC && props.book.parts!.map(p => (
                    <div key={p.index}>
                        <h3>Part { p.index }</h3>
                        <div className={styles.chapters}>
                            <b>Chapters:</b> 
                            <ul>
                                { Array.from({ length: p.chapters }, (_, index) => (
                                    <li key={index}>
                                        <Link href={`/books/${props.book.slug}/parts/${p.index}/chapters/${index + 1}`}>{index + 1}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={toggleTOC}>{buttonText}</button>
        </>
    )
}