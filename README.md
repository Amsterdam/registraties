# Ontsluiten Basisregistraties

The 'Registraties' application aims to:
- simplify the process of collecting data from basis and core registrations from the municipality of Amsterdam in order to decrease time needed to gather information that is required for internal processes of the Wonen division and possibly also for other divisions
- provide authorized users with the most recent data from the basis and core registrations
- increase the knowledge about structure, relationships and contents of the data in basis and core registrations

## ADRs
Architectural decision records are available in [docs/adr](./docs/adr/README.md).

## CI/builds (Jenkins)
- branch `development` is automatically deployed to [acceptation](https://acc.registraties.amsterdam.nl)
- branch `master` requires confirmation in Jenkins to be deployed to [production](https://registraties.amsterdam.nl)
- additionally all branches will have linting and testing run when pushed to

## Authenticating on local dev server
In order reach the City Data authentication screen and sign in, the local dev server needs to be exposed on port 8080. The npm start command should do this (see the --port=8080 flag).

## Thanks to
<a href="http://browserstack.com/"><img src="app/images/browserstack-logo-600x315.png" height="130" alt="BrowserStack Logo" /></a>
