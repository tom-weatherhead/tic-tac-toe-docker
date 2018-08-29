# vt-client
Virginia Tech project - Angular client

- From angular.json, before "lint" :

        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "main": "src/test.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "src/tsconfig.spec.json",
            "karmaConfig": "src/karma.conf.js",
            "styles": [
              {
                "input": "styles.css"
              }
            ],
            "scripts": [],
            "assets": [
              {
                "glob": "favicon.ico",
                "input": "src/",
                "output": "/"
              },
              {
                "glob": "**/*",
                "input": "src/assets",
                "output": "/assets"
              }
            ]
          }
        },

Docker: (See https://medium.com/@DenysVuika/your-angular-apps-as-docker-containers-471f570a7f2 )

$ npm run ng serve --open
	- Then browse to http://localhost:4200

$ npm run build
	- This runs: ng build --prod

$ docker image build -t vt-client .
$ docker run -p 3000:80 --rm vt-client
	- Then browse to http://localhost:3000

$ docker-compose up [--build]
	- Send a POST request to the server to populate the database:
		$ curl -X POST http://localhost:3000/u/ingest
		$ curl http://localhost:3000/u/
		$ curl http://localhost:3000/u/1
	- Then browse to http://localhost:3002
	- After you're done using the app, clean up via: $ docker-compose down
	- To really clean up: $ docker-compose down --rmi all

From https://medium.com/@georgediaz/docker-your-clientside-and-api-apps-c675cc3449c8 :
? $ docker-compose run --rm backend bash
? $     docker-compose run --rm --service-ports frontend bash
	- The --service-portsflag is passed so that while we’re running through the instructions from the example below, we can hit the app at port 8080 from our web browser like this: http://localhost:8080

? $ COMPOSE_HTTP_TIMEOUT=200 docker-compose --verbose up --build

-> E.g. https://scotch.io/tutorials/create-a-mean-app-with-angular-2-and-docker-compose and https://github.com/gangachris/mean-docker
