# Demo Credit API

Welcome to the Demo Credit API, you can access the live [API here](https://folahanmi-ojokuku-lendsqr-be-test.onrender.com).

#### Entity Relationship Diagram (ERD)

![erd diagram](https://github.com/Folakuku/demo_credit/blob/main/erd_demo_credt.png?raw=true)

---

### Postman Documentation Link

Here is the Postman Documentation [here](https://documenter.getpostman.com/view/24732748/2sAYQfDUej)

---

### Explanation Documentation Link.

The Explanation Documentation is found [here](https://docs.google.com/document/d/1tWB147hFl842dFRwh6jPooezAtYiEVhkvkBV6toIvTM/edit?usp=sharing)

---

## Project Setup Instructions

### Prerequisites

Before proceeding, ensure you have the following installed on your system:

-   Node.js(LTS)
-   npm
-   MySQL

### Cloning the Repository

1. Open your terminal and navigate to the directory where you want to clone the project.

```shell
cd /path/to/your/directory
```

2. Clone the repository

```shell
 git clone https://github.com/Folakuku/demo_credit.git
```

3.  Navigate into the project directory

```shell
cd demo_credit
```

### Installing Dependencies

Install the project dependencies using npm:

```shell
npm install
```

### Setting Up the Environment Variables

```shell
ADJUTOR_API_KEY="your-adjutor-api-key"
ADJUTOR_APP_ID="your-adjutor-app-id"
ADJUTOR_API_URL="your-adjutor-api-url"
JWT_SECRET="your-jwt-secret"
DB_HOST="your-database-host"
DB_USER="your-database-user"
DB_PASSWORD="your-database-password"
DB_NAME="your-database-name"
DB_TEST_NAME="your-test-database-name"
```

### Setting Up the Database

1. Log in to your MySQL server

```sql
mysql -u <DB_USER> -p
```

2. Create the database

```sql
CREATE DATABASE <DB_NAME>
```

3. Exit the MySQL prompt

```shell
exit
```

### Running Migrations and Seeding the Database

Run the database migrations to set up the required tables:

```shell
npm run migrate:up
```

Run the following command to seed the database with initial data:

```shell
npm run seed
```

### Running Tests

To run the test suite, use the following command:

```shell
npm test
```
