import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../src/controllers/user.controller';
import { UserService } from '../src/services/user.service';

describe('UserController', () => {
  let appController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    appController = app.get<UserController>(UserController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.addUser({ name: 'admin' })).toBe('Hello World!');
    });
  });
});
