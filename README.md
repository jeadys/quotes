# The assignment

Your assignment is to build a web service. The main API endpoint of your service should
display a random quote, retrieved from a remote source (for example
https://dummyjson.com/quotes or https://zenquotes.io/api/random). Every request should
respond with another random quote. All other requirements are up to you. Be as creative as
you like, impress us! In general try to approach this assignment as a production project
(within reason).


## Demo
[Website](https://kabisa-quotes.onrender.com/)

[Webservice](https://quotes-xvnz.onrender.com/)

## Setup

Installation

```bash
  git clone https://github.com/jeadys/quotes
```

```bash
  cd quotes/frontend
  copy .env-example .env
  npm install
```

```bash
  cd quotes/backend
  python -m venv .venv
  .venv\Scripts\Activate
  pip install -r requirements.txt
```

Launch

```bash
  cd quotes/frontend
  npm run dev
```

```bash
  cd quotes/backend
  python main.py
```
