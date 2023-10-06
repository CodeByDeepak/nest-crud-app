import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(userDto: RegisterDto): Promise<User> {
    const hashedPassword: await bycrpt.hash(userDto.password, 10);
    const user = new User();
    user.username = userDto.username;
    user.passwordHash = userDto.hashedPassword;
    return this.usersRepository.save(user);
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ username });

    if(user && (await bycrpt.compare(password, user.passwordHash))) {
        return user;
    }

    return null;

  }
}
