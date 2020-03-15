import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import mocks from 'node-mocks-http';
import sinon from 'ts-sinon';
import { handleAuthentication } from '../../src/middlewares/authentication-middleware';

describe('authentication-middleware.ts', function() {
  describe('handleAuthentication', function() {
    it('Should return 401 if no authentication header is provided', function() {
      const req = mocks.createRequest();
      const res = mocks.createResponse();
      const next = (err?: any): void => {};

      sinon
        .stub(req, 'get')
        .withArgs('Authorization')
        .returns(undefined);
      handleAuthentication(req, res, next);

      expect(res._getStatusCode()).equal(401);
      expect(res._getJSONData())
        .to.have.property('message')
        .equal('Unauthorized');
    });
    it('Should authenticate correctly', function() {
      const req = mocks.createRequest();
      const res = mocks.createResponse();
      const next = sinon.spy((err?: any): void => {});

      sinon
        .stub(req, 'get')
        .withArgs('Authorization')
        .returns('Bearer token');

      sinon
        .stub(jwt, 'verify')
        .withArgs('token', 'my secret')
        // Must have this ts-ignore because of the overloads from the verify method
        // @ts-ignore
        .returns({ userId: 'userId' });

      handleAuthentication(req, res, next);

      expect(req).to.have.property('userId');
      expect(next.callCount).to.be.equal(1);

      sinon.restore();
    });
    it('Should fail if token is invalidated by the jwt library', function() {
      const req = mocks.createRequest();
      const res = mocks.createResponse();
      const next = (err?: any): void => {};

      sinon
        .stub(req, 'get')
        .withArgs('Authorization')
        .returns('Bearer token');

      sinon
        .stub(jwt, 'verify')
        .withArgs('token', 'my secret')
        // @ts-ignore
        .throws();

      handleAuthentication(req, res, next);

      expect(res._getStatusCode()).equal(401);
      expect(res._getJSONData())
        .to.have.property('message')
        .equal(`Token 'token' is invalid`);

      sinon.restore();
    });
  });
});
