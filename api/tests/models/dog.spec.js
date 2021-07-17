const {Temperament, Dog, conn } = require('../../src/db.js');
const { expect} = require('chai');


const dog = {
  name: "puchi",
  weight: "200",
  height: "2 - 3",
  created:true
}

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));

    describe('Find All dogs in database', function() {
      it('should have length 0 if theres any dog created', async function() {
        expect(await Dog.findAll()).to.have.length(0);
      });
    });  
    describe('Create a new Dog', function() {
      it('should have length 1 if it has been created',  function() {
        Dog.create(dog)
        .then(function (res){
          expect(res).to.have.length(1)
          })
        });
      });

      describe('Create a new Dog', () => {
        it('should throw an error if the dog is null', (done) => {
          Dog.create({})
            .then(() => done(new Error('It requires a valid name')))
            .catch(() => done());
      });
    })
    describe('Create a new Dog', function() {
      it('should have the property name',  function() {
        Dog.create(dog)
        .then(function (res){
          expect(res.body).to.be.haveOwnProperty("name")
        });
      });
    });

    describe('Find All Temperaments in database', function() {
      it('should have length 124, this has been pre-charged',  function() {
        Temperament.findAll()
        .then(function (res){
          expect(res.body).to.be.have.length(124) 
        });
      });
    });


  });
});  

