import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User, UserDto } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';
import { FirestoreUserRepository } from '../infrastructure/FirestoreUserRepository';

@Resolver()
export class UserResolver {
	private repository: UserRepository;

	constructor() {
		this.repository = new FirestoreUserRepository(); // ✅ Se instancia aquí si no usamos un contenedor de IoC
	}

	@Query(() => User, { name: 'findUser', description: 'Find a user by their user ID' })
	findUser(@Arg('userId', () => String) userId: string): Promise<User> {
		return this.repository.find(userId);
	}

	@Mutation(() => Boolean, {
		name: 'saveUser',
		description: 'Save a user',
		nullable: true,
		defaultValue: true,
	})
	saveUser(@Arg('user', () => UserDto) user: UserDto): Promise<boolean> {
		return this.repository.save(user);
	}

	@Mutation(() => Boolean, {
		name: 'removeUser',
		description: 'Remove a user',
		nullable: true,
		defaultValue: true,
	})
	removeUser(@Arg('userId', () => String) userId: string): Promise<boolean> {
		return this.repository.remove(userId);
	}
}
