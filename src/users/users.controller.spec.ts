import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'x@x.com',
          password: 'xx',
        } as User);
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 99, email, password: 'xx' } as User]);
      },
      // remove: () => {},
      // update: () => {},
    };
    fakeAuthService = {
      // signup: () => {},
      // signin: () => {},
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('find all users return list of users with given email', async () => {
    const [user] = await controller.getByEmail('xxx@xx.com');

    expect(user).toBeDefined();
  });

  it('find user returns signle use with given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  it('throws error if given id is not found', async (done) => {
    fakeUsersService.findOne = () => {
      throw new Error();
    };
    try {
      await controller.findUser('1');
    } catch (e) {
      done();
    }
  });
});
