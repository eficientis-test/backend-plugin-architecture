import { EventBus } from '../../core/EventBus';
import { PluginContract } from '../../core/PluginContract';
import { UserResolver } from './application/UserResolver';

export default class UsersPlugin implements PluginContract {
	name = 'UsersPlugin';
	private active = true;

	constructor(eventBus: EventBus) {
		// TODO
	}

	init(): void {
		console.log(`[${this.name}] initialized`);
	}

	getResolvers(): Function[] {
		return [UserResolver];
	}

	registerEvents?(eventBus: EventBus): void {
		console.log(`[${this.name}] Registrando eventos...`);
	}

	isActive(): boolean {
		return this.active;
	}

	setActive(state: boolean): void {
		this.active = state;
	}
}
