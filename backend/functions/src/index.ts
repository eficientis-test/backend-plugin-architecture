import * as functions from 'firebase-functions/v1'; // Asegura usar la versión correcta
import { Kernel } from './core/Kernel';
import { GraphQLServer } from './core/GraphQLServer';

const kernel = new Kernel();

const initServer = async () => {
	try {
		await kernel.initialize();
		const resolvers = kernel.getResolvers();

		if (resolvers.length === 0) {
			console.error('❌ No hay resolvers disponibles. Revisa la configuración de los plugins.');
			throw new Error('No hay resolvers disponibles.');
		}

		console.log(`✅ Resolvers obtenidos: ${resolvers.length}`);

		const server = new GraphQLServer(kernel);
		await server.start();
		console.log('✅ Servidor GraphQL inicializado correctamente');

		return server;
	} catch (error) {
		console.error('❌ Error iniciando el servidor:', error);
		throw new Error('Error iniciando el servidor');
	}
};

// 🔥 Firebase Functions debe estar definida ANTES de llamar a `initServer()`
exports.backend = functions
	.region('us-central1')
	.runWith({
		memory: '128MB',
		minInstances: 1,
		timeoutSeconds: 120,
	})
	.https.onRequest(async (req, res) => {
		try {

			// Inicializa el servidor si aún no está disponible
			const server = await initServer();
			const app = server.serve();

			// 🔥 Asegurar que cualquier request que llegue a /graphql sea manejada
			if (req.url.startsWith('/graphql')) {
				return app(req, res);
			}

			// 🔴 Si no es una ruta válida, responder con 404
			console.warn(`⚠️ Ruta no encontrada: ${req.url}`);
			res.status(404).send('NOT FOUND');
		} catch (error) {
			console.error('❌ Error manejando la solicitud:', error);
			res.status(500).send('Internal Server Error');
		}
	});
