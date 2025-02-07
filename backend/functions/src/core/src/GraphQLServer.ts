import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchemaSync } from 'type-graphql';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { Kernel } from './Kernel';
import { FirebaseApp } from './FirebaseApp';
import cors from "cors";

export class GraphQLServer {
	private app: express.Application;
	private server: ApolloServer;

	constructor(kernel: Kernel) {
		FirebaseApp.getInstance();
		this.app = express();

		// 🔥 Habilitamos CORS
		this.app.use(cors({ origin: true }));

		// 🔥 Obtener resolvers con manejo de errores
		const resolvers = kernel.getResolvers();
		if (resolvers.length === 0) {
			throw new Error('No hay resolvers disponibles para GraphQL.');
		}

		this.server = new ApolloServer({
			schema: buildSchemaSync({
				resolvers,
				validate: false,
			}),
			introspection: true,
			plugins: process.env.GRAPHQL_PLAYGROUND === 'true' ? [ApolloServerPluginLandingPageGraphQLPlayground()] : [],
			context: () => ({}),
		});
	}

	// Nuevo método para iniciar el servidor correctamente
	async start() {
		console.log('⏳ Iniciando Apollo Server...');
		await this.server.start();
		this.server.applyMiddleware({ app: this.app, path: '/graphql', cors: true });
		// console.log('Apollo Server listo en /graphql');
	}

	serve(): express.Application {
		return this.app;
	}
}
