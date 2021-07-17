/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'HenryPug',
  height: "12 - 22",
  created: true,
  weight: "35-95",
};

describe('dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /temperament', function()  {  //test to the temperament route
    it('should return all temperaments', function () {
      agent.get('/temperament')
      .expect(200)
      .expect('Content-Type', /json/) 
      .expect(function(res) {
      expect(res.body).to.have.length(124); //expect all 124 temperaments
      })
    });
  });
  describe('GET /All dogs', function () {  // test to the dogs route
    it('should return the dogs', function(){
      agent.get('/dogs')
      .expect(200)
      .expect('Content-Type', /json/) 
      .expect(function(res) {
      expect(res.body).to.have.length.greaterThanOrEqual(8); //should get the dogs
      })
    })});
  describe('GET /dogs/:id', function() {
    it('should has the property name', () =>{
      agent.get('/dogs/1')
      .expect(200)
      .expect('Content-Type', /json/) 
      .expect(function(res) {
      expect(res.body).to.haveOwnProperty("name"); // should have a property name as the dog really exists
      })
  });
    it('should return the correct dog',  ()=>{
      agent.get('/dogs/1')
      .expect(function(res){
        expect(res.body).to.be.deep.equal( //expects to get the corret dog to route /dogs/1
          {
            name: 'Affenpinscher',
            height: '9 - 11.5',
            weight: '6 - 13',
            age: '10 - 12 years',
            image: 'https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg',
            temperaments: [
              'Stubborn',
              'Curious',
              'Playful',
              'Adventurous',
              'Active',
              'Fun-loving'
            ]
          }
        );
      })
      
    });
    it('should return the correct dog by query',  ()=>{
      agent.get('/dogs?name=Affen')
      .expect(function(res){
        expect(res.body).to.be.deep.equal( //expects to get the corret dog to route /dogs?name
          {
            name: 'Affenpinscher',
            height: '9 - 11.5',
            weight: '6 - 13',
            age: '10 - 12 years',
            image: 'https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg',
            temperaments: [
              'Stubborn',
              'Curious',
              'Playful',
              'Adventurous',
              'Active',
              'Fun-loving'
            ]
          }
        );
      })
      
    });
    it('should return an error dog if doesnt found the dog',  ()=>{
      agent.get('/dogs?name=Messi Campeon') // get random dog
      .expect(200)
      .expect('content-type',/json/)
      .expect(function(res){
      expect(res.body).to.be.deep.equal([ // expect to equal the dog predeterminated
        {
        "name": "no encontramos al perro",
        "image": "https://image.freepik.com/free-vector/paper-ad-wall-about-missing-dog_124715-589.jpg",
        "id": 0
        }
        ])
      })
      
    });
  });
});
