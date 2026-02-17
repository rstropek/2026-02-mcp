import { Client } from '@modelcontextprotocol/sdk/client';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

const transport = new StreamableHTTPClientTransport(new URL('http://localhost:3000/mcp'));

const client = new Client({
  name: 'streamable-client',
  version: '1.0.0',
});

await client.connect(transport);

console.log('>>> Connected to streamable MCP server');
console.log('>>> List of tools:');

const tools = await client.listTools();
for (const tool of tools.tools) {
  console.log(`Tool: ${tool.name} (${tool.description}`);
}


console.log('\n>>> Testing pony_password tool:');

try {
  const result = await client.callTool({
    name: 'pony_password',
    arguments: {
      minLength: 16,
      special: true,
    },
  });

  console.log('Password generated:', ((result as any).content[0] as any).text);
} catch (error) {
  console.error('Error calling tool:', error);
}

transport.close();
