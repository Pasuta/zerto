const should = require('should');
const expect = require('expect');
const logger = require('../modules/logger');
const fullPath = `${process.cwd()}/`;

describe('wrong data scenario', function(){

  it('Should be Path is not setted', function(done){
    const logMessage = logger();
    logMessage.should.be.eql('Path is not setted');
    done();
  });

  it('Should be Event is not setted', function(done){
    const logMessage = logger('x');
    logMessage.should.be.eql('Event is not setted');
    done();
  });

  it('Should be Wrong file. Extension is not setted', function(done){
    const logMessage = logger('x', 'x');
    logMessage.should.be.eql('Wrong file. Extension is not setted');
    done();
  })

});

describe('not pdf file scenario', function(){

  it('Add event to x.txt', function(done){
    const logMessage = logger(`${fullPath}testDir/x.txt`, 'added');
    logMessage.should.be.eql('File x.txt has been added');
    done();
  });

});


describe('pdf file scenario', function(){

  it('Add event to sam_newman.pdf', function(done){
    const logMessage = logger(`${fullPath}testDir/sam_newman.pdf`, 'added');
    const d = new Date();
    const expectedTime = `${d.getHours()}:${d.getMinutes()}`;
    logMessage.should.be.eql(`File sam_newman_${expectedTime}.pdf has been added`);
    done();
  });

});
