## Car Search

`React 19`

`Visual Studio Code`

Car Search lets users browse cars for sale using card layouts and infinite scrolling (no pagination).

![](https://github.com/hk12347/CarSearch/blob/master/src/assets/car-search.jpg)

**Note.** API backend service is not included in this release. You must have a working API endpoint configured to use this app.

## API Calls

Car Search uses two environment variables defined in the .env file: `VITE_API_URL` and `VITE_DETAILS_URL`. The cars resource path is `/api/cars`.


### 1. Car list

`VITE_API_URL + /api/cars?start=<number>&end=<number>&maker=??&model=??&yearfrom=<YYYY>&yearto=<YYYY>&pricefrom=<number>&priceto=<number>&mileage=<number>&searchtext=<string>`

**Note:** The `start` and `end` parameters are always required. Other search parameters are optional: `maker, model, yearfrom, yearto, pricefrom, priceto, mileage, and searchtext`.

The **response example**:
```json
{"results":
	[
        {   
            "id":<number>,
            "name":"<string>",
			 "image_url":"<url>",
			 "url":"/path_to_resource/ -> for example: '/124/BMW-525'>",
			 "details":"<string>",
			 "mileage":"<string>",
			 "fuel_type":"<string>",
			 "transmission":"<string>",
			 "drive_type":"<string>",
			 "price":<number>,
      		  "year":<number>
        }, 
    ], 
 "resultCount":<number>}
```

**Note:** the URL for a car is **VITE_DETAILS_URL** (set in .env) **plus the car path** from the API, e.g. VITE_DETAILS_URL + URL — for example: `https://www.cars.com/124/BMW-525`.


### 2. Car makers (search)

`VITE_API_URL + /api/cars/make`

The **response example**:
```json
[
	{"item":"Most searched"},
	{"item":"Audi"},
	{"item":"BMW"},
	{"item":"Ford"},
	{"item":"Nissan"},
	{"item":"Opel"},
	{"item":"Skoda"},
	{"item":"Toyota"},
	{"item":"Volkswagen"},
	{"item":"Volvo"}, 
]
```

### 3. Car Models (when user selects a car maker)

`VITE_API_URL + /api/cars/model/BMW <car maker>`

The **response example**:
```json
[
	{ "item": "530 Gran Turismo" },
	{ "item": "535 Gran Turismo" },
	{ "item": "550 Gran Turismo" },
	{ "item": "620 Gran Turismo" },
	{ "item": "630 Gran Turismo" },
	{ "item": "ActiveHybrid 3" },
	{ "item": "i3" },
	{ "item": "i3s" },
	{ "item": "i4" },
	{ "item": "i4 M50" },
	{ "item": "i5" },
]
```
## Installation

##### Install dependencies

`npm install`

##### Run Car Seach from the root directory.

`npm run dev`

### Built With

-   React 19
-   React Router
-   React Hooks
-   Tanstack React Query (Infinite Scroller)
-   Styled Components + Tailwind CSS
-   Terser (for build)

**Note:** Dockerfile and docker-compose.yml included. Start the app with: `docker-compose up -d`

#### (C) HKuokkanen 2.1.2026.