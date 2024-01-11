const chai = require('chai');
const assert = chai.assert;

const server = require('../server');  /** import the Express App **/

const chaiHttp = require('chai-http');  /** require the chai-http plugin **/
chai.use(chaiHttp);  /** use the chai-http plugin **/

suite('Functional Tests', function () {
  this.timeout(5000);

  suite('Integration tests with chai-http', function () {
  
    // #1
    // If no name is passed, the endpoint responds with 'hello Guest'.
    test('Test GET /hello with no name', function (done) {
      chai
        .request(server)
        .get('/hello')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Guest');
          done();  // Always call the 'done()' callback when finished.
        });
    });

    // #2
    // Another one...
    test('Test GET /hello with your name', function (done) {
      chai
        .request(server)
        .get('/hello?name=xy_z')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello xy_z');
          done();  // Always call the 'done()' callback when finished.
        });
    });

    // #3
    test('Send {surname: "Colombo"}', function (done) {

      // we setup the request for you...
      chai
        .request(server)
        .put('/travellers')

        /** send {surname: 'Colombo'} here **/
        // .send({...})
        .send({surname: 'Colombo'})
        .end(function (err, res) {

          /** your tests here **/
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.name, 'Cristoforo');
          assert.equal(res.body.surname, 'Colombo');

          done();  // Never forget the 'done()' callback...
        });
    });

    // #4
    /** Repetition is the mother of learning. **/
    // Try it again. This time without help !!
    test('Send {surname: "da Verrazzano"}', function (done) {

      /** place the chai-http request code here... **/
      chai
        .request(server)
        .put('/travellers')
        .send({surname: 'da Verrazzano'})

      /** place your tests inside the callback **/
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.name, 'Giovanni');
          assert.equal(res.body.surname, 'da Verrazzano');

          done();
        });
    });

  });

});

const Browser = require('zombie');

Browser.site = 'https://01-quality-assurance-and-testing-with-chai.glitch.me'; 

suite('Functional Tests with Zombie.js', function () {
  this.timeout(5000);

  const browser = new Browser();


  suiteSetup(function(done) {
    return browser.visit('/', done);
  });

  suite('Headless browser', function () {
    test('should have a working "site" property', function() {
      assert.isNotNull(browser.site);
    });
  });

  suite('"Famous Italian Explorers" form', function () {

     // #5
    test('Submit the surname "Colombo" in the HTML form', function (done) {

      // fill the form, and submit.
      // assert that status is OK 200.
      // assert that the text inside the element 'span#name' is 'Cristoforo'.
      // assert that the text inside the element 'span#surname' is 'Colombo'.
      // assert that the element(s) 'span#dates' exist and their count is 1.

      browser
        .fill('surname', 'Colombo')
        .then(() => browser.pressButton('submit', function () {
          browser.assert.success();
          browser.assert.text('span#name', 'Cristoforo');
          browser.assert.text('span#surname', 'Colombo');
          browser.assert.elements('span#dates', 1);
        }));
      
      done();  // It's an async test, so we have to call 'done()'.
    });

    // #6
    /** Try it again... No help this time **/
    test('Submit the surname "Vespucci" in the HTML form', function (done) {

      // fill the form, and submit.
      // assert that status is OK 200.
      // assert that the text inside the element 'span#name' is 'Amerigo'.
      // assert that the text inside the element 'span#surname' is 'Vespucci'.
      // assert that the element(s) 'span#dates' exist and their count is 1.

      browser
        .fill('surname', 'Vespucci')
        .then(() => browser.pressButton('submit', function () {
          browser.assert.success();
          browser.assert.text('span#name', 'Amerigo');
          browser.assert.text('span#surname', 'Vespucci');
          browser.assert.elements('span#dates', 1);
        }));

      done();  // It's an async test, so we have to call 'done()'.
    });

  });

});