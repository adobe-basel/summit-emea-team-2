# Adobe Summit EMEA

Franklin prototype of the site https://summit-emea.adobe.com/emea

## Environments
- Preview: https://main--summit-emea-team-2--adobe-basel.hlx.page/
- Live: https://main--summit-emea-team-2--adobe-basel.hlx.live/

## Installation

```sh
npm i
```

## Tests

### Run

```sh
npm t
```

### Debug

```sh
npm run test:watch
```

## Linting

```sh
npm run lint:js
```

## Development

### Run your site locally

1. Install the [Helix CLI](https://github.com/adobe/helix-cli)
   ```
   npm install -g @adobe/helix-cli
   ```
2. Start Helix proxy
   ```
   hlx up
   ```
3. Go to [http://localhost:3000/](http://localhost:3000/)

### Edit content

Content is stored on Sharpoint.

Open the URL in [fstab.yaml](./fstab.yaml) in your browser and start editing content.

Put your test content under `/site/drafts/{your github handle}`.

### Edit code

Open this repository in your favorite IDE and hack it.

Run your site locally to visualise the impact of your change.

Use your browser developer extension to debug your code.