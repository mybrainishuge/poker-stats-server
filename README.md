# Poker Stats Server

### `Setup`

1. Install node and mysql locally

```sh
$ brew install node mysql
```

2. Create database named "pokerdb"

```sh
$ mysql -u root -p
mysql> CREATE DATABASE pokerdb;
```

3. Create user named "pokerdb" with password "password"

```sh
mysql> CREATE USER 'pokeruser'@'localhost' IDENTIFIED BY 'password';
mysql> GRANT ALL PRIVILEGES ON pokerdb.* TO 'pokeruser'@'localhost';
mysql> quit
```

4. Install dependences

```sh
$ npm install
```

5. Create `.env` file using `.env.example`
   - Requires valid Cloudinary API key and secret

### `npm run dev`

Runs the server in development mode.<br>
Open [http://localhost:3333](http://localhost:3333) to view it in the browser.

The server will reload if you make edits.<br>

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### To Do

- Add better error handling
- Write tests
