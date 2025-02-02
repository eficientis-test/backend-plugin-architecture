import { EventBus } from "./EventBus";

export interface PluginContract {
  name: string;
  init(): void;
  getResolvers?(): Function[];
  registerEvents?(eventBus: EventBus): void;
  isActive(): boolean;
}