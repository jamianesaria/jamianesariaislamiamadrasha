const token = process.env.SANITY_API_TOKEN;
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '3829zb8h';

async function checkCors() {
  const res = await fetch(`https://api.sanity.io/v2021-06-07/projects/${projectId}/cors`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  console.log('CORS origins:', JSON.stringify(data, null, 2));
}

checkCors();

