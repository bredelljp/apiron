/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler deploy src/index.ts --name my-worker` to deploy your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		if (request.method === 'POST' && new URL(request.url).pathname === '/website_kpis') {
			// Parse the JSON payload from the request
			const data: { name: string, url: string } = await request.json();
			const { name, url } = data;
			if (!name || !url) {
				return new Response('Name and URL are required', { status: 400 });
			}

			// Return a response with the provided name and URL
			const responsePayload = {
				name,
				url,
				timestamp: new Date().toISOString(),
			};

			return new Response(JSON.stringify(responsePayload), {
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*', // Allow requests from any origin (You may restrict this to specific origins)
					'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Add other allowed methods if needed
					'Access-Control-Allow-Headers': 'Content-Type', // Add other allowed headers if needed
				},
				status: 200,
			});

			// return new Response(JSON.stringify(responsePayload), {
			// 	headers: { 'Content-Type': 'application/json' },
			// 	status: 200,
			// });
		} else if (request.method === 'GET') {
			// Handle GET requests
			return new Response('Use POST not GET', { status: 200 });
		} else {
			// Return "Not Found" for other request methods and paths
			return new Response('Not Found', { status: 404 });
		}
	},
};
