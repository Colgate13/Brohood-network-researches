# Brohood-networrk-researches

network-researches is a Nodejs APIresFull for researches, NPS and create tables applied static with dades genere for researches and NPS.

## technologies
- yarn and npm
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/#/) (DB SQL)
- [Jest](https://jestjs.io/) (TESTS)
- [Nodemailer](https://nodemailer.com/about/) (Send Mails)

## Installation

```yarn 
git clone https://github.com/Colgate13/Brohood-networrk-researches.git
yarn add
npm install
yarn typeorm migration:run
yarn test
yarn dev
$ > Server is running!
```

## Usage

For send JSON and request's ->  install  [insomnia](https://insomnia.rest/)

For acess SQLlite(Data base) -> install  [Beekeeper Studio](https://www.beekeeper.io/)

```nodejs APIrestFull WITH Insomnia 

(POST)localhost/users ->

request(JSON)
{ 
	"name": "Gabriel Barros",
	"email": "gabreilbarros13@gmail.com",
	"password": "123456789"
}

response(JSON)
{
  "id": "e4d62a53-18ca-4582-bff3-6680eb4e462d",// user id
  "name": "Gabriel Barros",// Name
  "email": "gabreilbarros13@gmail.com", // Email
  "password": "123456789", // Password
  "created_at": "2021-03-01T01:30:37.000Z" // Date created
}


(POST)localhost/surveys 

request(JSON)
{
	"propried": "e4d62a53-18ca-4582-bff3-6680eb4e462d",// A user_id for create survey/researches
	"title": "Brohood networrk researches",
	"description": "Brohood network researches is good?"
}

response(JSON)
{
  "id": "a757d7ec-8b52-4293-937e-a29efc71c957",
  "propried": "e4d62a53-18ca-4582-bff3-6680eb4e462d",// USER ID who created research/survey/researches
  "title": "Brohood networrk researches",//Title for survey/researches
  "description": "Brohood network researches is good?",// Description for survey/researches
  "created_at": "2021-03-01T01:32:37.000Z"// Date created
}


(GET)localhost/surveys

response(JSON)
[{list research/survey/researches created}]

(POST)localhost/sendMail

request(JSON)
{
	"email": "test@dxecig.com",// EMAIL recipient 
	"survey_id": "a757d7ec-8b52-4293-937e-a29efc71c957"// research/survey/researches ID
}

response(JSON)
{
  "id": "66006929-986f-49d8-8688-22fb49e3dc51",//ID answer
  "user_id": "pal@dxecig.com",// EMAIL recipient 
  "survey_id": "a757d7ec-8b52-4293-937e-a29efc71c957", // research/survey/researches ID
  "created_at": "2021-03-01T01:41:10.000Z"// Date created
}


(GET)localhost/nps/:survey id

response(JSON)
{
  "detractor": 2, // negative ratings, NUMER. '2' are exemple
  "promoters": 3, // positive ratings, NUMER. '3' are exemple
  "passive": 5, // neutral ratings, NUMER. '5' are exemple
  "totalAnswers": 10 , // total Answers, NUMER.
  "nps": 14.2857 // NPS CAULATE
}

```

## Contributing

## License
[MIT](https://choosealicense.com/licenses/mit/)
