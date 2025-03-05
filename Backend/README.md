## Vehicle Fleet Management

### Overview

This project allows users to **manage a fleet of vehicles**, register vehicles, and track their parking locations.

In **[Step 1](https://github.com/hemantramphul/fulll/tree/step1/Backend)**, the focus is on **building the core functionality** of the fleet management system.

It is implemented using:

- **TypeScript** for structured and scalable code
- **Domain-Driven Design (DDD)** for clear separation of concerns
- **Behavior-Driven Development (BDD)** for ensuring expected behavior through tests

---

### Project versions

👉 **[Step 1](https://github.com/hemantramphul/fulll/tree/step1/Backend) - Available in the [`step1`](https://github.com/hemantramphul/fulll/tree/step1/Backend) branch**  
👉 **[Step 2](https://github.com/hemantramphul/fulll) - Available in the [`main`](https://github.com/hemantramphul/fulll) branch**  
👉 **[Step 3](https://github.com/hemantramphul/fulll#step-3---project-code-quality--cicd-process) - Project (code quality & CI/CD process)**

---

### Installation & setup

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

---

### Tests

I use `cucumber.js` for **Behavior-Driven Development (BDD)** testing.

##### 1. Run BDD tests

```sh
npm test
```

##### 2. Expected output

```
> project@1.0.0 test
> cucumber-js --profile default --publish-quiet --format progress

............................

5 scenarios (5 passed)
28 steps (28 passed)
0m00.056s (executing steps: 0m00.005s)
```

---

### Project Structure

```
/src
   ├── App      # Application logic (Commands, Handlers) (CQRS)
   ├── Domain   # Business logic (Fleet, Vehicle, Location)
   ├── Infra    # Repositories, database setup
   ├── Tests    # BDD tests (Cucumber.js)
```

---

### Author

[Hemant Ramphul](https://www.linkedin.com/in/hemantramphul/)<br/>
<sup>28 February, 2025</sup>
