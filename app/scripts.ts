async function fetchData(prompt) {
    try {
        const p = {
            text: prompt
        };
        // Simulate an asynchronous operation, e.g., fetching data from an API
        const response = await fetch('http://127.0.0.1:8000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(p)
        });
        const data = await response.json();

        const promptTag = document.getElementById("prompt");
        if(promptTag) promptTag.innerHTML = data["prompt"];

        const answerTag = document.getElementById("answer");
        if(answerTag) answerTag.innerHTML = data["answer"];
    } catch (error) {
        // Handle errors if the async operation fails
        console.error('Error:', error);
        const answerTag = document.getElementById("answer");
        if(answerTag) answerTag.innerHTML = error;
    }
}

// Call the async function
fetchData("What's the book about?");