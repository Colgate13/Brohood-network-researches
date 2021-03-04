# Brohood-networrk-researches

Network-researchers is a Node Js API restFul for NPS surveys and creates static tables applied with the survey data.

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
  "detractor": 6, // negative ratings, NUMER. '2' are exemple
  "promoters": 1, // positive ratings, NUMER. '3' are exemple
  "passive": 2, // neutral ratings, NUMER. '5' are exemple
  "totalAnswers": 9, // total Answers, NUMER.
  "nps": -55.5556, // NPS CAULATE
  
  "hated": 2,// Answers 1/2
  "disliked": 2,// Answers 3/4
  "indifferent": 2, // Answers 5/6
  "like": 2, // Answers 7/8
  "love": 1, // Answers 9/10
  "returnEstatics": {
    "N": 9,  // total Answers, NUMER.
    "FrHated": 2, // Answers total hated(1/2)
    "FrDisliked": 2, // Answers total disliked(3/4)
    "FrIndifferent": 2, // Answers total indifferent(5/6)
    "FrLike": 2, // Answers total like(7/8)
    "FrLove": 1, // Answers total love(9/10)
    
    "FrAcHated": 2, // "FrAcHated" = "FrHated"
    "FrAcDisliked": 4, //  "FrAcDisliked" = "FrAcHated" + "FrDisliked" = 4
    "FrAcIndifferent": 6,  //   "FrAcIndifferent" = "FrAcDisliked + "FrIndifferent" = 6
    "FrAcLike": 8, //   "FrAcLike" = "FrAcIndifferent" +  "FrLike" = 8
    "FrAcLove": 9, // "FrAcLove" =  "FrAcLike" + "FrLove" = 9
    
    "FiHated": 22.22222222222222, // % Answers hated
    "FiDisliked": 22.22222222222222,  // % Answers disliked
    "FiIndifferent": 22.22222222222222,  // % Answers indifferent
    "FiLike": 22.22222222222222,  // % Answers like
    "FiLove": 11.11111111111111,  // % Answers love 
    
    "FiAcHated": 22.22222222222222, // "FiAcHated" = "FiHated"
    "FiAcDisliked": 44.44444444444444, //  "FiAcDisliked" = "FiAcHated" + "FiDisliked" = 44.44444444444444
    "FiAcIndifferent": 66.66666666666666,  //   "FiAcIndifferent" = "FiAcDisliked + "FiIndifferent" = 66.66666666666666
    "FiAcLike": 88.88888888888889, //   "FiAcLike" = "FiAcIndifferent" +  "FiLike" =  88.88888888888889
    "FiAcLove": 100, // "FiAcLove" =  "FiAcLike" + "FiLove" = 100
    
    "AlfaHated": 80, // Degrees For pie chart/statistic graph
    "AlfaDisliked": 80, // Degrees For pie chart/statistic graph
    "AlfaIndifferent": 80, // Degrees For pie chart/statistic graph
    "AlfaLike": 80, // Degrees For pie chart/statistic graph
    "AlfaLove": 40 // Degrees For pie chart/statistic graph Sum for all = 360
  }
}
}

```

## Contributing
### For Contribute so open Issue or Pull request, pls help me to do the best code


## License
[MIT](https://choosealicense.com/licenses/mit/)
