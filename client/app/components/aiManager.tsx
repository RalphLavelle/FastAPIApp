require('dotenv').config()

const aiManager = {
    fetchData: async (prompt: string) => {
        try {
            const p = {
                text: prompt
            };
            const endpoint = process.env.SERVER_ENDPOINT;
            const response = await fetch(endpoint!, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(p)
            });
            const data = await response.json();
            return data["answer"];
        } catch (error) {
            // Handle errors if the async operation fails
            console.error('Error:', error);
            return error; 
        }
    }
}

export { aiManager };