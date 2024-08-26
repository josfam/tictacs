# tictacs

A multiplayer tic-tac-toe game. This is our project submission for the qualifying round of the ALX SE Face Off competition(2024)

## How to run the project in a unix environment

### 1. Clone this repository and cd into it

```sh
git clone https://github.com/josfam/tictacs && cd tictacs
```

### 2. Install mongodb

```sh
sudo apt-get install gnupg
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
--dearmor \
&& echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list \
&& sudo apt-get update \
&& sudo apt-get install -y mongodb-org \
&& echo "mongodb-org hold" | sudo dpkg --set-selections \
&& echo "mongodb-org-database hold" | sudo dpkg --set-selections \
&& echo "mongodb-org-server hold" | sudo dpkg --set-selections \
&& echo "mongodb-mongosh hold" | sudo dpkg --set-selections \
&& echo "mongodb-org-mongos hold" | sudo dpkg --set-selections \
&& echo "mongodb-org-tools hold" | sudo dpkg --set-selections
```

### 3. Install node

```sh
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt-get install nodejs -y
```

### 4. Install project dependencies

```sh
npm install
```

### 5. Start the local server

```sh
npm run devstart
```

The output of that last command should look something like this:

```sh
> tictacs@1.0.0 devstart
> nodemon index.js

[nodemon] 3.1.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node index.js`
Connected successfully!
Server listening on port 3000
```

### 6. Visit the application in your browser of choice

In the url of your browser, type in (or paste in):

```txt
localhost:3000
```
