# Landing page API

The purpose of this project is to provide the means for users to sign up for our beta platform newsletter.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

- [Node.js](https://nodejs.org/en/download/) (v12 preferably)
- [PostgreSQL 11](https://www.postgresql.org/download/)
- [SendGrid API key](https://sendgrid.com/docs/ui/account-and-settings/api-keys/#creating-an-api-key)
- [Discord webhook URL](https://support.discordapp.com/hc/en-us/articles/228383668-Intro-to-Webhooks)

### Installing

1. Clone

```sh
git clone https://github.com/freelyis/placeholder-api
```

2. Install dependencies

```sh
npm ci
```

3. Populate the env file

```sh
cp ./.env.example .env
nano .env
```

See [`.env.example`](https://github.com/freelyis/placeholder-api/blob/master/.env.example) for a template config.

## Running the tests

Run the linter using

```bash
npm run-script lint
```

## Deployment

Run `index.js` with your preferred process monitor (pm2 probably)

## Routes

The base URL for requests is `https:/freely.is`.
This can be changed in the `.env` file.

| Type | Route                       | Parameters                                    |
| ---- | --------------------------- | --------------------------------------------- |
| POST | `/api/submitinterest`       | JSON Body `json { "email": "string" }`        |
| GET  | `/api/verifyinterest/:UUID` | URL UUID token assigned to the user on signup |
