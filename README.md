# iamr.site

The personal site is a static HTML port of the original Astro site.

## Runtime

- Plain HTML and the original compiled CSS
- Self-hosted [Data-Star v1.0.2](https://data-star.dev/) for site interactions
- No package manager, build step, framework runtime, or client router
- Small domain scripts remain for GitHub activity, the QR implementation, and in-browser ML inference

## Run locally

```sh
python3 -m http.server 4321
```

Open <http://localhost:4321>.

## Routes

- `/` — home and recent activity
- `/blog/` — searchable and filterable writing
- `/blog/<slug>/` — static posts with reactive progress and mobile contents
- `/projects/` — project gallery
- `/qr/` — QR generator
- `/gptability/` — in-browser essay prompt model

There is no install or build command. Deploy the repository as static files.
