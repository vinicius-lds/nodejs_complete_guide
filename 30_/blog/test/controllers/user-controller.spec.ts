import { expect } from 'chai';
import mocks from 'node-mocks-http';
import sinon from 'ts-sinon';
import { userController } from '../../src/controllers/user-controller';
import { UserModel } from '../../src/models/user-model';

describe('user-controller.ts', function() {
  describe('login', function() {
    it('Should return status 401 and error message saying no users with that email were found', async function() {
      const req = mocks.createRequest();
      const res = mocks.createResponse();
      const next = (err?: any): void => {};

      req.body.email = 'test@test.com';

      sinon
        .stub(UserModel, 'findOne')
        // @ts-ignore
        .withArgs({ email: req.body.email })
        .returns(Promise.resolve(undefined));

      await userController.login(req, res, next);

      expect(res._getJSONData())
        .to.be.have.property('message')
        .to.be.equal(`No users with the email 'test@test.com' were found`);
      expect(res._getStatusCode()).to.be.equal(401);

      sinon.restore();
    });
  });
});
