const BASE = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_AIRFLOW_BASE_URL ? import.meta.env.VITE_AIRFLOW_BASE_URL : '/airflow/api/v1';

function authHeader() {
  try {
    const u = localStorage.getItem('AF_USER');
    const p = localStorage.getItem('AF_PASS');
    if (u && p) return { Authorization: 'Basic ' + btoa(`${u}:${p}`) };
    return {};
  } catch {
    return {};
  }
}

async function handle(res) {
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function listDAGs() {
  const res = await fetch(`${BASE}/dags`, { headers: { ...authHeader() } });
  return handle(res);
}

export async function triggerRun(dagId, triggerDate, conf = {}) {
  const body = { dag_run_id: `manual__${dagId}__${triggerDate}`, conf: { trigger_date: triggerDate, ...conf } };
  const res = await fetch(`${BASE}/dags/${encodeURIComponent(dagId)}/dagRuns`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(body),
  });
  return handle(res);
}

export async function getRun(dagId, dagRunId) {
  const res = await fetch(`${BASE}/dags/${encodeURIComponent(dagId)}/dagRuns/${encodeURIComponent(dagRunId)}`, { headers: { ...authHeader() } });
  return handle(res);
}

export async function listRuns(dagId, limit = 25, offset = 0) {
  const res = await fetch(`${BASE}/dags/${encodeURIComponent(dagId)}/dagRuns?limit=${limit}&offset=${offset}`, { headers: { ...authHeader() } });
  return handle(res);
}

export default { listDAGs, triggerRun, getRun, listRuns };