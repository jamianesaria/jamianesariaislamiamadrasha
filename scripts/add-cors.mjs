const token = process.env.SANITY_API_TOKEN;
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '3829zb8h';

async function addCors(origin) {
  const res = await fetch(`https://api.sanity.io/v2021-06-07/projects/${projectId}/cors`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      origin: origin,
      allowCredentials: true
    })
  });
  const data = await res.json();
  console.log(`Added CORS origin ${origin}:`, data);
}

async function main() {
  await addCors('http://localhost:3000');
  await addCors('http://localhost:3001');
}

main();

