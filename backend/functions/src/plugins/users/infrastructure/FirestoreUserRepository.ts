import { getRepository } from 'fireorm';
import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export class FirestoreUserRepository implements UserRepository {
	/**
	 * Finds a user by their user ID.
	 *
	 * @param userId - The ID of the user to find.
	 * @returns A promise that resolves with the user data if found, or throws an error
	 *     if the user is not found.
	 */
	async find(userId: string): Promise<User> {
		const user = await getRepository(User).findById(userId);
		return user;
	}

	/**
	 * Saves a user to Firestore.
	 *
	 * If the user does not exist in Firestore, it creates a new user with the provided
	 * data. If the user does exist, it updates the existing user with the provided data.
	 *
	 * @param user - The user to save.
	 * @returns A promise that resolves with no value if the user is saved successfully,
	 *     or rejects if an error occurs.
	 */
	async save(user: User): Promise<boolean> {
		const exist = await this.find(user.id);

		if (!exist?.id) {
			await getRepository(User).create(user);
		} else {
			await getRepository(User).update(user);
		}

		return true;
	}

	/**
	 * Deletes a user by their user ID.
	 *
	 * @param userId - The ID of the user to delete.
	 * @returns A promise that resolves with no value if the user is deleted
	 *     successfully, or rejects if an error occurs.
	 */
	async remove(userId: string): Promise<boolean> {
		await getRepository(User).delete(userId);
		return true;
	}
}
