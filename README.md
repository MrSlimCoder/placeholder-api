# Landing page API

The purpose of this project is to provide the means for users to sign up for our beta platform newsletter.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
NodeJS (12 preferrably)
PostgreSQL 11
SendGrid API key
Discord webhook URL
```

### Installing


1. Clone

```bash
git clone https://github.com/freelyis/placeholder-api
```

2. Install dependencies

```bash
npm ci
```

3. Populate the env file


## Running the tests

Run the linter using

```bash
npm run-script lint
```

## Deployment

Run `index.js` with your preferred process monitor (pm2 probably)

## Routes

| Type |  Route | Parameters |
|------|--------|------------|
| POST | /api/submitinterest   | Body ``` { email: 'string' } ``` |
| GET  | /api/verifyinterest/:UUID   | URL UUID token assigned to the user on signup |

