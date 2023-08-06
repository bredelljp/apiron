// Define the main function to handle incoming requests
async function handleRequest(request) {
  if (request.method === 'POST' && new URL(request.url).pathname === '/website_kpis') {
    // Parse the JSON payload from the request
    const data = await request.json();
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
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } else if (request.method === 'GET') {
    // Handle GET requests
    return new Response('Use POST not GET', { status: 200 });
  } else {
    // Return "Not Found" for other request methods and paths
    return new Response('Not Found', { status: 404 });
  }
}

// Attach the event listener to handle incoming requests
addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});
