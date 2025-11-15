import React, { useState, useEffect } from 'react'
import { LayoutDashboard, PlayCircle, ListCollapse, Settings, FileText, Users, Bell, CheckCircle, XCircle, Loader, ChevronDown, Calendar as CalendarIcon, Plus, Trash2, Slack, Mail, FileDown, Eye } from 'lucide-react'
import { attachmentUrl, listMessages } from './services/devMail.js'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts'

const mockSummary = { totalRuns: 128, success: 110, failed: 12, running: 6 }
const mockTermData = [ { term: 'Portaria', count: 450 }, { term: 'Resolução', count: 310 }, { term: 'Decreto', count: 280 }, { term: 'Edital', count: 190 }, { term: 'Licitação', count: 120 }, { term: 'Contrato', count: 95 } ]
const mockDailyData = [ { date: '11/11', total: 34, falhas: 2 }, { date: '12/11', total: 45, falhas: 1 }, { date: '13/11', total: 39, falhas: 0 }, { date: '14/11', total: 51, falhas: 3 }, { date: '15/11', total: 42, falhas: 1 } ]
const mockRuns = [ { id: 'run_123', dag_id: 'dou_clipping_diario', status: 'success', trigger_date: '2025-11-14', triggered_by: 'Operador 1', params: '{ "force": true }' }, { id: 'run_124', dag_id: 'qd_clipping_semanal', status: 'running', trigger_date: '2025-11-14', triggered_by: 'scheduler', params: '{}' }, { id: 'run_125', dag_id: 'dou_clipping_diario', status: 'failed', trigger_date: '2025-11-13', triggered_by: 'Operador 2', params: '{}' }, { id: 'run_126', dag_id: 'dou_clipping_diario', status: 'success', trigger_date: '2025-11-12', triggered_by: 'scheduler', params: '{}' }, { id: 'run_127', dag_id: 'inlabs_sync', status: 'success', trigger_date: '2025-11-12', triggered_by: 'scheduler', params: '{}' } ]

const Card = ({ children, className = '' }) => (<div className={`bg-card text-card-foreground border border-border rounded-lg shadow-sm ${className}`}>{children}</div>)
const CardHeader = ({ children, className = '' }) => (<div className={`p-6 pb-2 ${className}`}>{children}</div>)
const CardTitle = ({ children, className = '' }) => (<h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h3>)
const CardContent = ({ children, className = '' }) => (<div className={`p-6 pt-0 ${className}`}>{children}</div>)

const Button = ({ children, variant = 'default', size = 'default', className = '', ...props }) => {
  const variants = { default: 'bg-primary text-primary-foreground hover:bg-primary/90', destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90', outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground', secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80', ghost: 'hover:bg-accent hover:text-accent-foreground', link: 'text-primary underline-offset-4 hover:underline' }
  const sizes = { default: 'h-10 px-4 py-2', sm: 'h-9 rounded-md px-3', lg: 'h-11 rounded-md px-8', icon: 'h-10 w-10' }
  return (<button className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{children}</button>)
}

const Input = ({ className = '', type = 'text', ...props }) => (<input type={type} className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} {...props} />)
const Label = ({ children, htmlFor, className = '' }) => (<label htmlFor={htmlFor} className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}>{children}</label>)

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = { default: 'border-transparent bg-primary text-primary-foreground', secondary: 'border-transparent bg-secondary text-secondary-foreground', destructive: 'border-transparent bg-destructive text-destructive-foreground', success: 'border-transparent bg-green-600 text-white', running: 'border-transparent bg-blue-600 text-white animate-pulse' }
  return (<div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`}>{children}</div>)
}

const Table = ({ children, className = '' }) => (<div className="w-full overflow-auto"><table className={`w-full caption-bottom text-sm ${className}`}>{children}</table></div>)
const TableHeader = ({ children, className = '' }) => (<thead className={`[&_tr]:border-b ${className}`}>{children}</thead>)
const TableBody = ({ children, className = '' }) => (<tbody className={`[&_tr:last-child]:border-0 ${className}`}>{children}</tbody>)
const TableRow = ({ children, className = '' }) => (<tr className={`border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className}`}>{children}</tr>)
const TableHead = ({ children, className = '' }) => (<th className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}>{children}</th>)
const TableCell = ({ children, className = '' }) => (<td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}>{children}</td>)

const DashboardHomePage = ({ summary, termData, dailyData }) => (
  <div className="space-y-6">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total de Execuções (24h)</CardTitle><ListCollapse className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{summary.totalRuns}</div><p className="text-xs text-muted-foreground">+10 desde ontem</p></CardContent></Card>
      <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Sucesso</CardTitle><CheckCircle className="h-4 w-4 text-green-500" /></CardHeader><CardContent><div className="text-2xl font-bold">{summary.success}</div><p className="text-xs text-muted-foreground">98.5% de taxa</p></CardContent></Card>
      <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Falhas</CardTitle><XCircle className="h-4 w-4 text-destructive" /></CardHeader><CardContent><div className="text-2xl font-bold">{summary.failed}</div><p className="text-xs text-muted-foreground">+2 desde ontem</p></CardContent></Card>
      <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Em Execução</CardTitle><Loader className="h-4 w-4 text-blue-500 animate-spin" /></CardHeader><CardContent><div className="text-2xl font-bold">{summary.running}</div><p className="text-xs text-muted-foreground">2 DAGs ativas</p></CardContent></Card>
    </div>
    <div className="grid gap-4 md:grid-cols-2">
      <Card><CardHeader><CardTitle>Clippings por Termo (Últimos 7 dias)</CardTitle></CardHeader><CardContent className="h-[300px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={termData}><CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} /><XAxis dataKey="term" fontSize={12} tickLine={false} axisLine={false} /><YAxis fontSize={12} tickLine={false} axisLine={false} /><Tooltip cursor={{fill: 'rgba(255, 255, 255, 0.1)'}} contentStyle={{backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '0.5rem'}} /><Bar dataKey="count" fill="#1e88e5" radius={[4,4,0,0]} /></BarChart></ResponsiveContainer></CardContent></Card>
      <Card><CardHeader><CardTitle>Execuções por Dia</CardTitle></CardHeader><CardContent className="h-[300px]"><ResponsiveContainer width="100%" height="100%"><AreaChart data={dailyData}><defs><linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#1e88e5" stopOpacity={0.8}/><stop offset="95%" stopColor="#1e88e5" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} /><XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} /><YAxis fontSize={12} tickLine={false} axisLine={false} /><Tooltip contentStyle={{backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '0.5rem'}} /><Area type="monotone" dataKey="total" stroke="#1e88e5" fillOpacity={1} fill="url(#colorTotal)" /></AreaChart></ResponsiveContainer></CardContent></Card>
    </div>
  </div>
)

const TriggerPage = () => {
  const [triggerDate, setTriggerDate] = useState(new Date().toISOString().split('T')[0])
  const [params, setParams] = useState('{\n  "force_run": true\n}')
  const [dagId, setDagId] = useState('dou_clipping_diario')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(localStorage.getItem('AF_USER') || 'airflow')
  const [pass, setPass] = useState(localStorage.getItem('AF_PASS') || 'airflow')

  const handleTrigger = async () => {
    try {
      setIsLoading(true)
      setMessage(null)
      localStorage.setItem('AF_USER', user)
      localStorage.setItem('AF_PASS', pass)
      const conf = JSON.parse(params || '{}')
      const { triggerRun } = await import('./services/airflow.js')
      const res = await triggerRun(dagId, triggerDate, conf)
      setMessage({ type: 'success', text: `Disparo criado: ${res.dag_run_id}` })
    } catch (e) {
      setMessage({ type: 'error', text: String(e.message || e) })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto"><CardHeader><CardTitle>Disparar Execução Manual</CardTitle></CardHeader><CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-2"><div className="space-y-2"><Label htmlFor="af_user">Usuário Airflow</Label><Input id="af_user" value={user} onChange={(e)=>setUser(e.target.value)} /></div><div className="space-y-2"><Label htmlFor="af_pass">Senha Airflow</Label><Input id="af_pass" type="password" value={pass} onChange={(e)=>setPass(e.target.value)} /></div></div>
      <div className="space-y-2"><Label htmlFor="dagId">DAG ID</Label><Input id="dagId" value={dagId} onChange={(e)=>setDagId(e.target.value)} placeholder="ex: dou_clipping_diario" /></div>
      <div className="space-y-2"><Label htmlFor="triggerDate">Data de Disparo (trigger_date)</Label><Input id="triggerDate" type="date" value={triggerDate} onChange={(e)=>setTriggerDate(e.target.value)} /></div>
      <div className="space-y-2"><Label htmlFor="params">Parâmetros (JSON)</Label><textarea id="params" value={params} onChange={(e)=>setParams(e.target.value)} className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" placeholder='{ "chave": "valor" }' /></div>
      <Button onClick={handleTrigger} disabled={isLoading} className="w-full">{isLoading ? <Loader className="h-4 w-4 animate-spin" /> : <PlayCircle className="h-4 w-4 mr-2" />}{isLoading ? 'Disparando...' : 'Disparar DAG'}</Button>
      {message && (<div className={`text-sm p-3 rounded-md ${message.type === 'success' ? 'bg-green-900 text-green-100' : 'bg-destructive text-destructive-foreground'}`}>{message.text}</div>)}
    </CardContent></Card>
  )
}

const RunsPage = ({ runs }) => {
  const getStatusBadge = (status) => { switch (status) { case 'success': return (<Badge variant="success">Sucesso</Badge>); case 'failed': return (<Badge variant="destructive">Falhou</Badge>); case 'running': return (<Badge variant="running">Executando</Badge>); default: return (<Badge variant="secondary">{status}</Badge>); } }
  const [dagId, setDagId] = useState('rodolfo_dou_example_ideal')
  const [data, setData] = useState(runs)
  const [loading, setLoading] = useState(false)
  useEffect(()=>{ (async ()=>{ try { setLoading(true); const { listRuns } = await import('./services/airflow.js'); const r = await listRuns(dagId, 25, 0); const mapped = (r.dag_runs || []).map(x => ({ id: x.dag_run_id, dag_id: x.dag_id, status: x.state, trigger_date: x.conf && x.conf.trigger_date ? x.conf.trigger_date : '', triggered_by: x.external_trigger ? 'manual' : 'scheduler' })); setData(mapped) } catch { setData([]) } finally { setLoading(false) } })() }, [dagId])
  return (
    <Card><CardHeader><CardTitle>Histórico de Execuções</CardTitle></CardHeader><CardContent>
      <div className="flex items-center gap-2 mb-4"><Input value={dagId} onChange={(e)=>setDagId(e.target.value)} /><Button disabled={loading} onClick={()=>setDagId(dagId)}>{loading ? <Loader className="h-4 w-4 animate-spin"/> : 'Atualizar'}</Button></div>
      <Table><TableHeader><TableRow><TableHead>Status</TableHead><TableHead>DAG ID</TableHead><TableHead>Data Disparo</TableHead><TableHead>Disparado por</TableHead><TableHead className="text-right">Ações</TableHead></TableRow></TableHeader><TableBody>
        {data.map(run => (<TableRow key={run.id}><TableCell>{getStatusBadge(run.status)}</TableCell><TableCell className="font-medium">{run.dag_id}</TableCell><TableCell>{run.trigger_date}</TableCell><TableCell>{run.triggered_by}</TableCell><TableCell className="text-right space-x-2"><Button variant="outline" size="sm"><FileDown className="h-4 w-4 mr-1"/>Relatórios</Button><Button variant="ghost" size="sm"><Eye className="h-4 w-4 mr-1"/>Detalhes</Button></TableCell></TableRow>))}
      </TableBody></Table></CardContent></Card>
  )
}

const ConfigPage = () => {
  const [config, setConfig] = useState({ terms: ['portaria', 'decreto', 'resolução', 'licitação', 'extrato de contrato'], emails: ['operador@exemplo.com', 'gestor@exemplo.com'], webhooks: { slack: 'https://hooks.slack.com/services/T000.../B000.../XXXX', discord: 'https://discord.com/api/webhooks/1234.../YYYY' } })
  const [newTerm, setNewTerm] = useState('')
  const addTerm = () => { if (newTerm && !config.terms.includes(newTerm)) { setConfig(prev => ({ ...prev, terms: [...prev.terms, newTerm] })); setNewTerm('') } }
  const removeTerm = (termToRemove) => { setConfig(prev => ({ ...prev, terms: prev.terms.filter(t => t !== termToRemove) })) }
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card><CardHeader><CardTitle>Termos de Busca</CardTitle></CardHeader><CardContent>
        <div className="flex space-x-2 mb-4"><Input value={newTerm} onChange={(e)=>setNewTerm(e.target.value)} placeholder="Adicionar novo termo..." onKeyPress={(e)=> e.key === 'Enter' && addTerm()} /><Button onClick={addTerm}><Plus className="h-4 w-4 mr-2"/>Adicionar</Button></div>
        <div className="flex flex-wrap gap-2">{config.terms.map(term => (<Badge key={term} variant="secondary" className="text-base py-1 px-3 rounded-lg">{term}<Button variant="ghost" size="icon" className="h-5 w-5 ml-2" onClick={()=>removeTerm(term)}><XCircle className="h-4 w-4"/></Button></Badge>))}</div>
      </CardContent></Card>
      <Card><CardHeader><CardTitle>Notificações (E-mail e Webhooks)</CardTitle></CardHeader><CardContent className="space-y-4">
        <div className="space-y-2"><Label>Destinatários de E-mail (separados por vírgula)</Label><Input value={config.emails.join(', ')} onChange={(e)=>setConfig(prev => ({ ...prev, emails: e.target.value.split(',').map(em => em.trim()) }))} /></div>
        <div className="space-y-2"><Label className="flex items-center"><Slack className="h-4 w-4 mr-2"/>Webhook do Slack</Label><Input value={config.webhooks.slack} onChange={(e)=>setConfig(prev => ({ ...prev, webhooks: { ...prev.webhooks, slack: e.target.value } }))} placeholder="https://hooks.slack.com/..." /></div>
        <div className="space-y-2"><Label className="flex items-center"><svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.885-1.5152..."/></svg>Webhook do Discord</Label><Input value={config.webhooks.discord} onChange={(e)=>setConfig(prev => ({ ...prev, webhooks: { ...prev.webhooks, discord: e.target.value } }))} placeholder="https://discord.com/api/webhooks/..." /></div>
        <Button className="w-full">Salvar Configurações</Button>
      </CardContent></Card>
    </div>
  )
}

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const navItems = [ { name: 'Resumo', icon: LayoutDashboard, key: 'resumo' }, { name: 'Disparar', icon: PlayCircle, key: 'disparar' }, { name: 'Execuções', icon: ListCollapse, key: 'execucoes' }, { name: 'Relatórios', icon: FileText, key: 'relatorios' }, { name: 'Configurações', icon: Settings, key: 'configuracoes' }, { name: 'Auditoria', icon: Users, key: 'auditoria' } ]
  return (
    <nav className="hidden md:flex flex-col w-64 border-r border-border bg-card">
      <div className="p-4 border-b border-border"><h2 className="text-xl font-bold">DOU/QD Clipping</h2></div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">{navItems.map(item => (<Button key={item.key} variant={currentPage === item.key ? 'secondary' : 'ghost'} className="w-full justify-start" onClick={()=>setCurrentPage(item.key)}><item.icon className="h-4 w-4 mr-2" />{item.name}</Button>))}</div>
    </nav>
  )
}

const Header = () => (
  <header className="flex items-center h-16 px-6 border-b border-border bg-card"><div className="flex-1" />
    <div className="flex items-center space-x-4"><Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button><div className="flex items-center space-x-2"><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">O</div><span className="text-sm font-medium">Operador 1</span><ChevronDown className="h-4 w-4 text-muted-foreground" /></div></div>
  </header>
)

const ReportsPage = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  useEffect(()=>{ (async ()=>{ try { setLoading(true); setError(null); const data = await listMessages(); const results = data.results || []; setItems(results) } catch (e) { setError(String(e.message || e)); setItems([]) } finally { setLoading(false) } })() }, [])
  const filtered = items.filter(m => !query || (m.subject || '').toLowerCase().includes(query.toLowerCase()))
  return (
    <Card><CardHeader><CardTitle>Relatórios (smtp4dev)</CardTitle></CardHeader><CardContent>
      <div className="flex items-center gap-2 mb-4"><Input placeholder="Filtrar por assunto (ex.: 14/11/2025)" value={query} onChange={(e)=>setQuery(e.target.value)} /><Button variant="outline" disabled={loading}>{loading ? <Loader className="h-4 w-4 animate-spin"/> : 'Atualizar'}</Button></div>
      {error && <div className="text-sm p-3 rounded-md bg-destructive text-destructive-foreground mb-4">{error}</div>}
      <Table><TableHeader><TableRow><TableHead>Assunto</TableHead><TableHead>De</TableHead><TableHead>Para</TableHead><TableHead>Recebido</TableHead><TableHead className="text-right">Ações</TableHead></TableRow></TableHeader><TableBody>
        {filtered.map(m => (<TableRow key={m.id}><TableCell className="font-medium">{m.subject}</TableCell><TableCell>{m.from}</TableCell><TableCell>{(m.to || []).join(', ')}</TableCell><TableCell>{m.receivedDate?.replace('T',' ').replace('Z','')}</TableCell><TableCell className="text-right space-x-2"><a href={attachmentUrl(m.id, 1)} target="_blank" rel="noreferrer"><Button variant="outline" size="sm"><FileText className="h-4 w-4 mr-1"/> HTML</Button></a><a href={attachmentUrl(m.id, 2)} target="_blank" rel="noreferrer"><Button variant="outline" size="sm"><FileDown className="h-4 w-4 mr-1"/> CSV</Button></a></TableCell></TableRow>))}
      </TableBody></Table>
      <div className="mt-6 text-xs text-muted-foreground">Dica: em desenvolvimento, estes links passam pelo proxy `/smtp` para evitar CORS.</div>
    </CardContent></Card>
  )
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('resumo')
  const [runs, setRuns] = useState(mockRuns)
  const [summary, setSummary] = useState(mockSummary)
  const [termData, setTermData] = useState(mockTermData)
  const [dailyData, setDailyData] = useState(mockDailyData)
  const renderPage = () => { switch (currentPage) { case 'resumo': return (<DashboardHomePage summary={summary} termData={termData} dailyData={dailyData} />); case 'disparar': return (<TriggerPage />); case 'execucoes': return (<RunsPage runs={runs} />); case 'configuracoes': return (<ConfigPage />); case 'relatorios': return (<ReportsPage />); case 'auditoria': return (<div className="text-center p-10"><Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" /> <h2 className="text-xl font-semibold">Seção de Auditoria</h2><p className="text-muted-foreground">Aqui ficaria o log de auditoria (quem disparou, quem alterou, etc).</p></div>); default: return (<DashboardHomePage summary={summary} termData={termData} dailyData={dailyData} />) } }
  return (
    <div className="flex h-screen w-full bg-background text-foreground dark" style={{ fontFamily: 'Inter, sans-serif' }}>
      <style>{`.dark { --background: 240 10% 3.9%; --foreground: 0 0% 98%; --card: 240 10% 3.9%; --card-foreground: 0 0% 98%; --popover: 240 10% 3.9%; --popover-foreground: 0 0% 98%; --primary: 210 40% 98%; --primary-foreground: 222.2 47.4% 11.2%; --secondary: 240 3.7% 15.9%; --secondary-foreground: 0 0% 98%; --muted: 240 3.7% 15.9%; --muted-foreground: 240 5% 64.9%; --accent: 240 3.7% 15.9%; --accent-foreground: 0 0% 98%; --destructive: 0 62.8% 30.6%; --destructive-foreground: 0 0% 98%; --border: 240 3.7% 15.9%; --input: 240 3.7% 15.9%; --ring: 210 40% 98%; } .bg-background{background-color:hsl(var(--background))}.text-foreground{color:hsl(var(--foreground))}.bg-card{background-color:hsl(var(--card))}.text-card-foreground{color:hsl(var(--card-foreground))}.border-border{border-color:hsl(var(--border))}.bg-primary{background-color:hsl(var(--primary))}.text-primary-foreground{color:hsl(var(--primary-foreground))}.bg-secondary{background-color:hsl(var(--secondary))}.text-secondary-foreground{color:hsl(var(--secondary-foreground))}.text-muted-foreground{color:hsl(var(--muted-foreground))}.bg-accent{background-color:hsl(var(--accent))}.text-accent-foreground{color:hsl(var(--accent-foreground))}.bg-destructive{background-color:hsl(var(--destructive))}.text-destructive-foreground{color:hsl(var(--destructive-foreground))}.border-input{border-color:hsl(var(--input))}.ring-ring{--tw-ring-color:hsl(var(--ring))}.hover\\:bg-primary\\/90:hover{background-color:hsl(var(--primary)/0.9)}.hover\\:bg-secondary\\/80:hover{background-color:hsl(var(--secondary)/0.8)}.hover\\:bg-accent:hover{background-color:hsl(var(--accent))}.hover\\:text-accent-foreground:hover{color:hsl(var(--accent-foreground))}`}</style>
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col h-screen"><Header /><main className="flex-1 overflow-y-auto p-6 md:p-8">{renderPage()}</main></div>
    </div>
  )
}