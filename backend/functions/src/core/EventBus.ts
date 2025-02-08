type EventCallBack = (payload: any) => void;

export class EventBus {
  private listeners: Map<string, EventCallBack[]> = new Map();

  /**
   * Suscribe un nuevo callback a un evento específico
   * @param event Nombre del evento
   * @param callback Función que se ejecutará cuando se publique el evento
   */
  subscribe(event: string, callback: EventCallBack): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event)?.push(callback);
  }

  /**
   * Publica un evento, ejecutando todas las funciones suscritas a él.
   * Soporta funciones síncronas y asíncronas.
   * @param event Nombre del evento
   * @param payload Datos que se enviarán a los suscriptores
   */
  async publish(event: string, payload: any): Promise<void> {
    if (!this.listeners.has(event)) {
      return;
    }

    const callbacks = this.listeners.get(event) ?? [];

    const results = await Promise.allSettled(
      callbacks.map(async (callback) => {
        try {
          await callback(payload);
        } catch (error) {
          console.error(`Error ejecutando callback en el evento ${event}:`, error);
          
        }
      })
    );

    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`Error ejecutando callback ${index + 1} en el evento ${event}:`, result.reason);
      }
    })
  }

}