import { PluginContract } from './PluginContract';

export class PluginRegistry {
	private plugins: Map<string, PluginContract> = new Map();

	/*
	 * Registra nuevo plugin
	 */
	register(plugin: PluginContract): void {
		if (this.plugins.has(plugin.name)) {
			console.warn(`Plugin ${plugin.name} ya está registrado.`);
			return;
		}

		this.plugins.set(plugin.name, plugin);
		console.log(`Plugin ${plugin.name} registrado.`);
	}

	/*
	 * Obtiene un plugin por su nombre
	 */
	getPlugin(name: string): PluginContract | undefined {
		return this.plugins.get(name);
	}

	/*
	 * Obtiene todos los plugins registrados
	 */
	getAllPlugins(): PluginContract[] {
		return Array.from(this.plugins.values());
	}
}
