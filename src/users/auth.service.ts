import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // check if email exist
    const users = await this.usersService.find(email);
    // if exist error
    if (users.length) {
      throw new BadRequestException('Email already exist');
    }
    // hash password bcrypt stuff
    // generate salt
    const salt = randomBytes(8).toString('hex');
    // hash the salt and password
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // join the hashed result and salt
    const hasedPassword = salt + '.' + hash.toString('hex');

    // save in database
    const user = await this.usersService.create(email, hasedPassword);
    // return user
    return user;
  }

  async signin(email: string, password: string) {
    // get user from db , error if dons't exit
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new BadRequestException('User dosnt exit');
    }

    // get password salt
    const [salt, hash] = user.password.split('.');
    // compare hashing provided password with salt to the hash in db , send error if not equal
    const hashedInput = (await scrypt(password, salt, 32)) as Buffer;

    if (hashedInput.toString('hex') !== hash) {
      throw new BadRequestException('wrong password');
    }
    return user;
  }
}
