'use client'
import { useState } from 'react';
import styles from './styles.module.scss'
require('dotenv').config()
import { aiManager } from '@/app/components/aiManager';
import Image from 'next/image'

export default function QandA() {

    const [loading, setLoading] = useState(false)
    const [answer, setAnswer] = useState("")

    const promptHandler = async (e: any) => {
        setLoading(true);
        setAnswer("")
        e.preventDefault();
        const prompt = e.target.elements.prompt.value;
        setAnswer(await aiManager.fetchData(prompt));
        setLoading(false);
    }

    return (
        <div className={`${styles.section} ${styles.qanda}`}>
            <form onSubmit={promptHandler}>
                <h3>Question</h3>
                <input type="text" id="prompt" name="prompt" placeholder="What in bejaysus is this?" required />
                <button type="submit">Ask</button>
            </form>
            { loading ? <div className={styles.loading}>
                    <Image src="/spinner.svg" width="40" height="40" alt="Thinking" />
                    <span>Thinking...</span>
                </div> : null }
            { answer ? <p className={styles.answer}>{ answer }</p> : null }
        </div>
    )
}