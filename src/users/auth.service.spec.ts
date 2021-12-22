import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('Can create an istance of AuthService', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('3b7ameed@gmail.com', 'Anything');

    expect(user.email).toEqual('3b7ameed@gmail.com');
    expect(user.password).not.toEqual('Anything');
    expect(user.password).toContain('.');
  });

  // Something wrong with new version of jest
  //   it('throws an error if user signs up with email that is in use', async (done) => {
  //     fakeUsersService.find = () =>
  //       Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
  //     service
  //       .signup('asdf@asdf.com', 'asdf')
  //       .then((x) => x)
  //       .catch((e) => {
  //         done();
  //       });
  //   });
});
