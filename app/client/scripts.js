async function fetchData(prompt) {
    try {
        const p = {
            text: prompt
        };
        // const endpoint = "http://127.0.0.1:80/";
        const endpoint = "https://rlfast3.azurewebsites.net/";
        const response = await fetch(endpoint, {
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
fetchData("Did they ever go to Kerry, and if so, what did they do there?");