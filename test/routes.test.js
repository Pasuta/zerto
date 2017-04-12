const app = require('../app');
const request = require('supertest').agent(app.listen());
const should = require('should');
const expect = require('expect');

describe('404', function(){
  describe('when GET /unknown', function(){
    it('should return the 404 page', function(done){
      request
        .get('/unknown')
        .expect(404)
        .expect(/Page Not Found/, done);
    })
  })
});

describe('200 Index', function () {
  describe('when GET /', function () {
    it('should return the 200 ok', function (done) {
      request
        .get('/')
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);
          done();
        })
    })
  });
});

describe('POST /watcher', function () {

  describe('/start route success scenario', function () {

    it('should return 200 and message Path testDir has been successfully added to watcher', function (done) {
      request
        .post('/watcher/start')
        .send({type: 'start', path: 'testDir'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);
          const response = res.body;
          expect(response).should.not.be.empty();
          response.should.have.property('message');
          response.message.should.be.eql('Path testDir has been successfully added to watcher');
          done(err);
        });
    });

  });

  describe('/stop route success scenario', function () {

    it('should return 200 and message Path testDir has been successfully removed from watcher', function (done) {
      request
        .post('/watcher/stop')
        .send({type: 'stop', path: 'testDir'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          should.not.exist(err);
          const response = res.body;
          expect(response).should.not.be.empty();
          response.should.have.property('message');
          response.message.should.be.eql('Path testDir has been successfully removed from watcher');
          done(err);
        });
    });

  });
  
  describe('/start route error scenario', function () {
    it('should return 500 and error message when empty data passed', function (done) {
      request
        .post('/watcher/start')
        .send({})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500)
        .end((err, res) => {
          should.not.exist(err);
          const response = res.body;
          expect(response).should.not.be.empty();
          response.should.have.property('error');
          response.error.should.be.eql('Data is wrong');
          done(err);
        });
    });

    it('should return 500 and when wrong event', function (done) {
      request
        .post('/watcher/start')
        .send({type: 'e', path: 'e'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500)
        .end((err, res) => {
          should.not.exist(err);
          const response = res.body;
          expect(response).should.not.be.empty();
          response.should.have.property('error');
          response.error.should.be.eql('Wrong type of event');
          done(err);
        });
    });

    it('should return 500 and message Path e is not exists', function (done) {
      request
        .post('/watcher/start')
        .send({type: 'start', path: 'e'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500)
        .end((err, res) => {
          should.not.exist(err);
          const response = res.body;
          expect(response).should.not.be.empty();
          response.should.have.property('error');
          response.error.should.be.eql('Path e is not exists');
          done(err);
        });
    });

  });

  describe('/stop route error scenario', function () {
    it('should return 500 and error message when empty data passed', function (done) {
      request
        .post('/watcher/stop')
        .send({})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500)
        .end((err, res) => {
          should.not.exist(err);
          const response = res.body;
          expect(response).should.not.be.empty();
          response.should.have.property('error');
          response.error.should.be.eql('Data is wrong');
          done(err);
        });
    });

    it('should return 500 and when wrong event', function (done) {
      request
        .post('/watcher/stop')
        .send({type: 'e', path: 'e'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500)
        .end((err, res) => {
          should.not.exist(err);
          const response = res.body;
          expect(response).should.not.be.empty();
          response.should.have.property('error');
          response.error.should.be.eql('Wrong type of event');
          done(err);
        });
    });

    it('should return 500 and message Watcher is empty', function (done) {
      request
        .post('/watcher/stop')
        .send({type: 'stop', path: 'e'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500)
        .end((err, res) => {
          should.not.exist(err);
          const response = res.body;
          expect(response).should.not.be.empty();
          response.should.have.property('error');
          response.error.should.be.eql('Watcher is empty');
          done(err);
        });
    });


    it('should return 500 and message Path e is not listening', function (done) {
      request
        .post('/watcher/start')
        .send({type: 'start', path: 'testDir'})
        .set('Accept', 'application/json')
        .end((errStart, resStart) => {

          request
            .post('/watcher/stop')
            .send({type: 'stop', path: 'e'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500)
            .end((err, res) => {
              should.not.exist(err);
              const response = res.body;
              expect(response).should.not.be.empty();
              response.should.have.property('error');
              response.error.should.be.eql('Path e is not listening');
              done(err);
            });
          
        });
    });
    
  });


});
