# tictacs

A multiplayer tic-tac-toe game. This is our project submission for the qualifying round of the ALX SE Face Off competition(2024)

---

## How to run the project locally in a unix environment

### A. If you are in a hurry, then just copy and paste this into your terminal, and hit enter

```sh
wget https://raw.githubusercontent.com/josfam/projectquickinstall/main/tictacs-be-install.sh && sudo chmod +x tictacs-be-install.sh && ./tictacs-be-install.sh
```

\
You may need to enter your password a few seconds after hitting enter.
\
Other than that, that's it! You are done.
\
Go grab a drink, and you'll return to an open browser, in which you can try the game.
\
\
Note: To create a two-player setup, paste the url displayed in your now open browser to another
\
new private/incognito window, to simulate another player.

---
---
---

### B. If you'd rather do things yourself, then follow these instructions instead

### 1. Clone this repository and cd into it

```sh
git clone https://github.com/josfam/tictacs-backend && cd tictacs-backend
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

### 5. Add a .env file at the root or the repository

The project server loads information from environment variables in a `.env` file.
\
This file is not included in this repository, as it contains secrets.
\
You therefore have to make your own `.env` file. You can use this template, and give your own value to the
\
`SESSION_SECRET` variable by putting anything between the quotation marks.

```sh
SESSION_SECRET=""
DB_HOST="127.0.0.1"
DB_PORT="27017"
DB_NAME="tictacs"
```

### 6. Start the local server

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

### 7. Open your browser of choice and paste in the url bar, this address

```txt
localhost:3000
```

\
Note: To create a two-player setup, paste the url displayed in your now open browser to another
\
new private/incognito window, to simulate another player.

---
