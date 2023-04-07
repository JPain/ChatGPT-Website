# Project Name

[Short project description]

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (version 14.x.x or later recommended)
- Python (version 3.7 or later recommended)
- Anaconda (recommended for creating a virtual environment)

### Installing

Clone the repository to your local machine.

```
git clone https://github.com/JPain/ChatGPT-Website.git
```

Change to the project directory.

```
cd ChatGPT-Website
```

Install the required packages for the Python server using conda.

```
cd server
conda env create -f environment.yml
conda activate [environment name]
```

You might need to install a bunch of packages regardless of the conda env, so here they are

```
pip install openai Flask python-dotenv jsonify request
```

Install the required packages for the React client using npm.

```
cd client
npm install
```

### Running

Start the Python server.

```
cd server
python app.py
```

Start the React client in a new terminal.

```
cd client
npm start
```

Open your browser and go to http://localhost:3000 to see the app running.

## Built With

- React - Frontend framework
- Node.js - JavaScript runtime environment
- Express.js - Backend web framework
- Flask - Micro web framework for Python
- OpenAI API - Language model API