Geo GitHub
==========

Installation
------------

```
npm install
```

Development
-----------

As far as this application talks with github and mapbox APIs, first you need to generate access tokens for this services.

See **How to get access tokens** section below.

```
GITHUB_TOKEN=<github_access_token> MAPBOX_TOKEN=<mapbox_access_token> npm run start:dev
```

If you want just build project, run
```
GITHUB_TOKEN=<github_access_token> MAPBOX_TOKEN=<mapbox_access_token> npm run build:dev
```

Production
----------

To build production version of Geo GitHub application just run
```
GITHUB_TOKEN=<github_access_token> MAPBOX_TOKEN=<mapbox_access_token> npm run build
```

How to get access tokens
------------------------

As far as this application talks with github and mapbox APIs, first you need to generate access tokens for this services.

To generate *github* access token make sure you signed into github account and go to [/settings/tokens](https://github.com/settings/tokens)

To get *mapbox* access token, [sign up](https://www.mapbox.com/signup/) for this service and create net token here: [/studio/account/tokens/](https://www.mapbox.com/studio/account/tokens/)

Having this two tokens now you can run development server and access application by visiting [localhost:8000](http://localhost:8000)