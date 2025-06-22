import fetch from 'node-fetch';

const projectId = process.env.VERCEL_PROJECT_ID;
const token = process.env.VERCEL_TOKEN;

if (!projectId || !token) {
  console.error('VERCEL_PROJECT_ID and VERCEL_TOKEN must be set');
  process.exit(1);
}

async function getLatestDeployment() {
  const res = await fetch(`https://api.vercel.com/v6/deployments?projectId=${projectId}&limit=1`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch deployments');
  const data = await res.json();
  return data.deployments[0];
}

async function getDeploymentLogs(id: string) {
  const res = await fetch(`https://api.vercel.com/v2/deployments/${id}/events`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch logs');
  return res.text();
}

async function triggerRedeploy() {
  const res = await fetch('https://api.vercel.com/v13/deployments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ projectId })
  });
  if (!res.ok) throw new Error('Failed to trigger redeploy');
  console.log('Redeployment triggered');
}

(async () => {
  try {
    const deployment = await getLatestDeployment();
    if (!deployment) throw new Error('No deployments found');
    const logs = await getDeploymentLogs(deployment.uid);
    if (/error/i.test(logs)) {
      console.log('Deployment logs contain errors. Redeploying...');
      await triggerRedeploy();
    } else {
      console.log('Latest deployment healthy');
    }
  } catch (err) {
    console.error('Monitoring failed:', err);
    process.exit(1);
  }
})();
