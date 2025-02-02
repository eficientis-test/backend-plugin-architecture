import { EventBus } from "./EventBus";
import { PluginManager } from "./PluginManager";

export class Kernel {
	private pluginManager: PluginManager;

	constructor() {
		this.pluginManager = new PluginManager();
	}
	
	async initialize(): Promise<void> {
		await this.pluginManager.loadPlugins();
	}

	getEventBus(): EventBus {
		return this.pluginManager.getEventBus();
	}

	getResolvers(): [Function, ...Function[]] {
		const resolvers = this.pluginManager.getResolvers();

		if (resolvers.length === 0) {
			throw new Error('No se encontraron resolvers en los plugins cargados.');
		}

		// Asegura que el array tenga al menos un elemento
		return resolvers as [Function, ...Function[]];
	}
}
