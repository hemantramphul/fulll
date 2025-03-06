## Vehicle Fleet Management

### Overview

In [`step2`](https://github.com/hemantramphul/fulll/tree/step2/Backend), I extend [`step1`](https://github.com/hemantramphul/fulll/tree/step1/Backend) by **making the system accessible via a Command Line Interface (CLI)**.

This step **transforms Step 1 into a complete application** by:

1. **Introducing a CLI** with the following commands:

   - Create a fleet
   - Register a vehicle
   - Localize (park) a vehicle

2. **Persisting fleet and vehicle data** into a real database ([sqlite](https://www.sqlite.org/about.html)).

---

### Project versions

👉 **[Step 1](https://github.com/hemantramphul/fulll/tree/step1) - Available in the [`step1`](https://github.com/hemantramphul/fulll/tree/step1) branch**  
👉 **[Step 2](https://github.com/hemantramphul/fulll/Backend) - Available in the [`main`](https://github.com/hemantramphul/fulll/Backend) branch**  
👉 **[Step 3](#step-3---project-code-quality--cicd-process) - Project (code quality & CI/CD process)**

---

### Features

##### 1. Create a fleet

```sh
./fleet create <userId>   # Returns fleetId on the standard output
```

##### 2. Register a vehicle

```sh
./fleet register-vehicle <fleetId> <vehiclePlateNumber>
```

##### 3. Park a vehicle at a location

```sh
./fleet localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]
```

_<sup>`[alt]` is optional.</sup>_

---

### Setup & execution

##### 1. Prerequisites

- **Node.js** (v18 or later recommended)
- **npm** (comes with Node.js)
- **TypeScript** (installed globally or via `npm install`)

##### 2. Clone the repo

```sh
git clone https://github.com/hemantramphul/fulll.git
cd <your-local-repo-folder>
```

##### 3. Install dependencies

```sh
npm install
```

##### 4. Build the CLI

```sh
npm run build
```

##### 5. Setup the database (sqlite)

```sh
npm run migration:generate
npm run migration:run
```

##### 6. Link CLI globally

Run `fleet` as a global command, link it:

```sh
npm link
```

---

### Using the CLI

**Note:** The CLI is executed using `npx ts-node cli.ts` as `fleet`.

##### Commands

```sh
npx ts-node cli.ts create <userId>
npx ts-node cli.ts register-vehicle <fleetId> <plateNumber>
npx ts-node cli.ts localize-vehicle <fleetId> <plateNumber> <lat> <lng> [alt]
```

---

### Example

##### 1. Create a Fleet

Run the following command to create a new fleet.  
Make sure to **save the returned `fleetId`** as you'll need it in the next steps.

```sh
npx ts-node cli.ts create fulllers1
```

_<sup>**Expected Output**</sup>_

```
Fleet created with ID: 123e4567-e89b-12d3-a456-426614174000
```

---

##### 2. Register a Vehicle

Use the **`fleetId`** returned from (`1. Create a Fleet`) to register a vehicle in the fleet.

```sh
npx ts-node cli.ts register-vehicle <fleetId> FULLLERS-25
```

Example using the **`fleetId`** from (`1. Create a Fleet`):

```sh
npx ts-node cli.ts register-vehicle 123e4567-e89b-12d3-a456-426614174000 FULLLERS-25
```

_<sup>**Expected Output**</sup>_

```
Vehicle FULLLERS-25 registered in fleet 123e4567-e89b-12d3-a456-426614174000
```

---

##### 3. Park a Vehicle

Use the same **`fleetId`** and vehicle plate number to park the vehicle at a location.

```sh
npx ts-node cli.ts localize-vehicle <fleetId> FULLLERS-25 48.8566 2.3522

```

Example using the **`fleetId`** from (`1. Create a Fleet`):

```sh
npx ts-node cli.ts localize-vehicle 123e4567-e89b-12d3-a456-426614174000 FULLLERS-25 48.8566 2.3522
```

_<sup>**Expected Output**</sup>_

```
Vehicle FULLLERS-25 parked at (48.8566, 2.3522, 0)
```

---

### Project Structure

```
/src
   ├── App      # Application logic (Commands, Handlers) (CQRS)
   ├── Domain   # Business logic (Fleet, Vehicle, Location)
   ├── Infra    # Repositories, database setup (Entities, Migrations)
   ├── Tests    # BDD tests (Cucumber.js)
/cli.ts         # CLI - Command Line Interface
```

---

### Step 3 - Project (code quality & ci/cd process)

##### 1. Code quality

To improve **code quality**, I have use **ESLint**.

**<ins>Why ESLint?</ins>**

**ESLint** helps enforce **clean and consistent code** by detecting **syntax errors, bad practices, and code style issues** before they cause problems. It improves code maintainability and prevents bugs early in the development process.

##### 2. CI/CD

A **CI/CD (Continuous Integration/Continuous Deployment) pipeline** automates **testing, building, and deployment**.

**- Use GitHub actions or GitLab CI/CD** - automate **linting, testing, and building** whenever code is pushed.

**- Setup CI (`.github/workflows/ci.yml`)** - run **ESLint, Prettier, and tests** on every commit.

**- Setup CD (deployment):**

- _**For a CLI tool:**_ publish it to `npm` on every release.
- _**For a backend service:**_ deploy to **AWS Lambda**, **Docker**, or **a server**.

---

### Author

[Hemant Ramphul](https://www.linkedin.com/in/hemantramphul/)<br/>
<sup>03 March, 2025</sup>
