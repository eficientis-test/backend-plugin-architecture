import { Collection } from 'fireorm';
import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@Collection('Users')
export class User {
	@Field(() => ID) id!: string;
	@Field(() => String) email!: string;
	@Field(() => String) fullname!: string;
	@Field(() => String, { nullable: true }) jobTitle?: string;
	@Field(() => String, { nullable: true }) photoUrl?: string;
	@Field(() => String) companyId!: string;
	@Field(() => String) workspaceId!: string;
	@Field(() => Number) createdAt!: number;
	@Field(() => Number) updatedAt!: number;
}

@InputType()
export class UserDto {
	@Field(() => ID) id!: string;
	@Field(() => String) email!: string;
	@Field(() => String) fullname!: string;
	@Field(() => String, { nullable: true }) jobTitle?: string;
	@Field(() => String, { nullable: true }) photoUrl?: string;
	@Field(() => String) companyId!: string;
	@Field(() => String) workspaceId!: string;
	@Field(() => Number) createdAt!: number;
	@Field(() => Number) updatedAt!: number;
}
