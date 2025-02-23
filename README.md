# Backend setup

- Create a database on your PostgreSQL command-line tool or use a GUI like pgAdmin.
  ```
  CREATE DATABASE lumaa;
  ```
- Create a .env file on the root directory and put these variables into it (Update them with your own values).
  ```
  DB_DIALECT=postgres
  DB_HOST=localhost
  DB_USER=YOUR_USER
  DB_PASSWORD=YOUR_PASSWORD
  DB_NAME=YOUR_DATABASE_NAME
  DB_PORT=5432
  JWT_SECRET=YOUR_SECRET_KEY
  ```
- Install the dependencies
  ```
  $ npm install
  ```  
- Generate the tables 'Users' and 'Tasks' if they don't exist.
  ```
  $ npx sequelize-cli db:migrate
  ```
- Run the servers on your local
  - Run the development server
    ```
    $ npm run dev
    ```
  - Run the tests with coverage
    ```
    $ npm run test        # run the tests
    $ npm run test:watch  # run the tests in watch mode
    ```
