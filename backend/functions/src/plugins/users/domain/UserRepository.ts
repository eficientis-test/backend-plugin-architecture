import { User, UserDto } from './User';

export interface UserRepository {
	find(userId: string): Promise<User>;
	save(user: UserDto): Promise<boolean>;
	remove(userId: string): Promise<boolean>;
}
