# ChampaignLocal

This is a website that provides customers a locally owned business alternative to products/stores that they are looking to purchase.

## Run Locally

Prerequisites:

* python (version 3.8.x) & pip
* node (version 12) & npm

### Install Frontend Dependencies

In the /static directory

```sh
npm install
```

### Build Frontend Resources

Option 1: Build React to be served by Flask (no browser debugging)

In the /static directory

```sh
npm run build
```

Flask is already configured to serve static files at /build.

App is located at http://localhost:5000

Option 2: Use react-scripts to debug React (browser debugging)

In the /static directory, open another terminal

```sh
npm run start
```

React is located at http://localhost:3000

All api requests are proxied to http://localhost:5000

### Setup .env configuration

In the root directory

```sh
cp .env.sample .env
```

Edit .env for your local or remote databases.

### Create virtualenv and install dependencies for Flask API

In the root directory

```sh
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Start Flask

In the root directory

```sh
python application.py
```

Flask is located at http://localhost:5000 (try http://localhost:5000/api/time)

## Credits

[Front-end template 'paper-kit-react' by Creative Tim](https://github.com/creativetimofficial/paper-kit-react)
