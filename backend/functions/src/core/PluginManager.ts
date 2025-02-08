import { EventBus } from './EventBus';
import { PluginRegistry } from './PluginRegistry';
import path from 'path';
import fs from 'fs';
import { PluginContract } from './PluginContract';

export class PluginManager {
	private registry: PluginRegistry;
	private eventBus: EventBus;

	constructor() {
		this.registry = new PluginRegistry();
		this.eventBus = new EventBus();
	}

	async loadPlugins() {
		const configPath = path.join(__dirname, '../config/plugins.config.json');
		const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
		const plugins = config.activePlugins || [];

		console.log(`Cargando ${plugins.length} plugins activos...`);

		for (const pluginName of plugins) {
			try {
				const pluginModule = await import(`../plugins/${pluginName}/index.js`);

				if (pluginModule.default) {
					const pluginInstance = new pluginModule.default(this.eventBus);

					if (!this.isValidPlugin(pluginInstance)) {
						console.warn(`Plugin "${pluginName}" no cumple con el contrato.`);
						continue;
					}

					this.register(pluginInstance);
					console.log(`✅ Plugin cargado: ${pluginName}`);
				}
			} catch (error) {
				console.error(`Error cargando el plugin "${pluginName}":`, error);
			}
		}
	}

	register(plugin: PluginContract): void {
		plugin.init();
		this.registry.register(plugin);
		plugin.registerEvents?.(this.eventBus);
		console.log(`Plugin ${plugin.name} registrado.`);
	}

	getEventBus(): EventBus {
		return this.eventBus;
	}

	getResolvers(): Function[] {
		return this.registry
			.getAllPlugins()
			.filter(plugin => plugin.isActive())
			.flatMap(plugin => plugin.getResolvers?.() || []);
	}

	private isValidPlugin(plugin: PluginContract): boolean {
		return typeof plugin.name === 'string' && typeof plugin.init === 'function';
	}
}
