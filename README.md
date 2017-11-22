GeoGitHub
=========

The question
------------
How do commits to open source projects on GitHub distribute in time and geography?

About
-----
GeoGitHub application visualizes the geographical commits distribution of a chosen repository.

This is a rather simple app, however, I've built it on top of the react+redux stack for the following reasons:
 * It allows to build things relatively fast
 * It adds a convenient structure to the application
 * Redux allows you to reason about data flow in a clear way

Nevertheless, I've challenged myself not to use third party libraries a lot,
so things like data fetching logic and animations are implemented primarily by myself on pure js and native browser APIs.

Demo
----
[https://youtu.be/JjChZNphtmU](https://www.youtube.com/watch?v=JjChZNphtmU&t=75)

![Demo](/docs/demo.png?raw=true)

Design
------
Application roughly consists of following parts:
 * **React**. Responsible for UI components.
 * **Redux**. Responsible for handling events and providing state store for components.
 * **Fetch class**. Does all the low-level job for talking with APIs, keep track of rate-limits and other HTTP issues.
 * **GithubDataprovider**. Uses Fetch instances for retrieving data from GitHub and Mapbox and builds an initial dataset.
 * **GeoEventsTimeline**. Converts initial dataset into the array, where each element has all necessary data to be plotted on the map and the timeline.
 * **Mapbox react component**. Takes an instance of GeoEventsTimeline with commits data, builds a model for canvas and animates it. Here I've used 3 helper libs from the d3 world:
    * *d3-timer* – a convenient abstraction above ``requestAnimationFrame``
    * *d3-ease* – set of ease functions to make animation more natural
    * *d3-scale* – simple way to map numbers into beautiful colour range

This app uses two external APIs:
 * GitHub provides all data about commits and committers
 * Mapbox is used for geocoding (converts location names into geo coordinates)
   Mapbox is used for its awesome looking maps and rate-limits for geocoding. It's much more generous compared to GoogleMaps API.

Installation and running
------------------------
First of all,
```
npm install
```

Development env
---------------
This application talks with GitHub and Mapbox APIs so you need to generate access tokens for this services.

See **How to get access tokens** section below.

The following command starts dev server:

```
GITHUB_TOKEN=<github_access_token> MAPBOX_TOKEN=<mapbox_access_token> npm run start:dev
```

Now you cat open application on [localhost:8000](http://localhost:8000)

If you want just to build a project, run:
```
GITHUB_TOKEN=<github_access_token> MAPBOX_TOKEN=<mapbox_access_token> npm run build:dev
```

Production env
--------------
To build production version of Geo GitHub application just run
```
GITHUB_TOKEN=<github_access_token> MAPBOX_TOKEN=<mapbox_access_token> npm run build
```

A simple way to serve content of the ``./dist`` directory over HTTP on a local machine is: 
```
cd ./dist
python -m SimpleHTTPServer
```

How to get access tokens
------------------------
As far as this application talks with GitHub and Mapbox APIs, first you need to generate access tokens for this services.

To generate *GitHub* access token make sure you signed into GitHub account and go to [/settings/tokens](https://github.com/settings/tokens). Click "Generate new token". There is no need to check any permission checkboxes.

To get *mapbox* access token, [sign up](https://www.mapbox.com/signup/) for this service and create net token here: [/studio/account/tokens/](https://www.mapbox.com/studio/account/tokens/)

Disclaimer and known issues
---------------------------

 * This app tested only on MacOS, mainly in Chrome 61 and Firefox 56.
 * It has a critical issue with data fetching in Safari.
 * Don't resize viewport after the app is launched.
 * Sometimes GitHub responds with abuse protection 403 errors. The application can handle it, but it slows down fetch process. Be patient!

Recommendations
--------------
Look at ``kubernetes/kubernetes``, ``moby/moby`` and ``golang/go`` repos – they are nice.
Interesting fact: ``ruby/ruby`` created mostly by Japan.
