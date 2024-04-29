# RAG on Express


This AI chatbot has memory and uses a vectorDB to store and retrieve old messages. It runs locally, leveraging a locally downloaded LLM for processing. Additionally, it supports an API route using Express and Node.js, enabling scalability for various use cases of the chatbot.






## Requirements

- [Ollama](https://ollama.ai/) verson 0.1.26 or higher.

## Setup AI Chatbot script

1. Clone this repository to your local machine.

2. Install the required Python packages by running `pip install -r requirements.txt`.

## Running the Project

**Note:** The first time you run the project, it will download the necessary models from Ollama for the LLM and embeddings. This is a one-time setup process and may take some time depending on your internet connection.

The time taken to start the local LLM will depend on your hardware configuration. It may take 1 - 3 min to start.

1. (optional, if you want to run only the python script and not the server) Ensure your virtual environment is activated or you can just install all the packages without making an environment.

2. Run the main script with `python app.py -m <model_name> -p <path_to_documents>` to specify a model and the path to documents. If no model is specified, it defaults to [orca-mini](https://ollama.com/library/orca-mini). If no path is specified, it defaults to `Research` located in the repository for example purposes.
3. Optionally, you can specify the embedding model to use with `-e <embedding_model_name>`. If not specified, it defaults to [nomic-embed-text](https://ollama.com/library/nomic-embed-text).

This will load the PDFs and Markdown files, generate embeddings, query the collection, and answer the question defined in `app.py`.

### Running the Project Locally

1. **Setup**: Navigate to the root directory and execute `npm i` to install all required node modules and packages for the Express server.

2. **API**: Navigate to the API directory and make a virtual environment and do `pip install -r requirements.txt`

3. **Start the Server**: Launch the server by running `node index.js` within the virtual environment.

4. **Access the Route**: Once the server is running, send a POST request to the designated route. Using Postman is recommended for this task.

By following these steps, you can run and interact with the project in your local environment.


## Usage

1. **Route:** Access the single route `send-input` on port `3000`.

2. **Initial Input:** Send a POST request to `localhost:3000/start-input` with the payload `{input: "<initial input>"}` to provide the initial input.

3. **Response:** The output will be sent back as a response to the same route (`localhost:3000/start-input`).

4. **File Support:** Place PDFs intended for embeddings in the 'Research' folder. This system also supports markdown files, so you can freely add files to the 'Research' folder.



## Technologies Used

- [Langchain](https://github.com/langchain/langchain): A Python library for working with Large Language Model
- [Ollama](https://ollama.ai/): A platform for running Large Language models locally.
- [Chroma](https://docs.trychroma.com/): A vector database for storing and retrieving embeddings.
- [PyPDF](https://pypi.org/project/PyPDF2/): A Python library for reading and manipulating PDF files.
- [Express](https://expressjs.com/): Express.js is a minimalist Node.js web application framework.
- [NodeJS](https://nodejs.org/en): Node.js is a server-side JavaScript runtime environment.


![alt text](images/image.png)