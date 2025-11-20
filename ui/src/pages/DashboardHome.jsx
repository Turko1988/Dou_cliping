import React, { useEffect, useState } from 'react';
import { MessageSquare, TrendingUp, AlertTriangle, Activity } from 'lucide-react';
import KPICard from '../components/dashboard/KPICard';
import SentimentChart from '../components/dashboard/SentimentChart';
import { api } from '../services/api';

const DashboardHome = () => {
  const [stats, setStats] = useState({
    mentions: 0,
    sentiment: 'Neutro',
    alerts: 0,
    sources: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Por enquanto, fazemos uma busca genérica para popular os dados
        // No futuro, isso viria de um endpoint de estatísticas dedicado
        const results = await api.searchDOU('portaria');

        setStats({
          mentions: results.length || 1284, // Fallback para mock se vazio
          sentiment: 'Neutro',
          alerts: 3,
          sources: 12
        });
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Visão Geral</h1>
        <p className="text-muted-foreground">Resumo das atividades e alertas do dia.</p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total de Citações"
          value={loading ? "..." : stats.mentions.toLocaleString()}
          trend="up"
          trendValue="12%"
          icon={MessageSquare}
          description="Comparado a ontem"
        />
        <KPICard
          title="Tom Médio"
          value={stats.sentiment}
          trend="up"
          trendValue="Melhorando"
          icon={TrendingUp}
          description="Tendência positiva nas últimas 24h"
        />
        <KPICard
          title="Alertas Críticos"
          value={stats.alerts}
          trend="down"
          trendValue="-2"
          icon={AlertTriangle}
          description="Novos alertas hoje"
        />
        <KPICard
          title="Fontes Ativas"
          value={stats.sources}
          trend="neutral"
          trendValue="0"
          icon={Activity}
          description="Monitorando em tempo real"
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 p-6 rounded-xl bg-card border border-border shadow-sm min-h-[400px]">
          <h3 className="text-lg font-medium mb-4">Tendência de Citações</h3>
          <div className="flex items-center justify-center h-[300px] text-muted-foreground bg-muted/10 rounded-lg border border-dashed border-border">
            <span className="text-sm">Gráfico de Linha (Em Breve)</span>
          </div>
        </div>
        <div className="col-span-3 p-6 rounded-xl bg-card border border-border shadow-sm min-h-[400px]">
          <h3 className="text-lg font-medium mb-4">Distribuição de Tom</h3>
          <SentimentChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
