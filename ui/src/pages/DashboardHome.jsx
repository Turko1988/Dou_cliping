import React from 'react';
import { MessageSquare, TrendingUp, AlertTriangle, Activity } from 'lucide-react';
import KPICard from '../components/dashboard/KPICard';
import SentimentChart from '../components/dashboard/SentimentChart';

const DashboardHome = () => {
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
          value="1,284"
          trend="up"
          trendValue="12%"
          icon={MessageSquare}
          description="Comparado a ontem"
        />
        <KPICard
          title="Tom Médio"
          value="Neutro"
          trend="up"
          trendValue="Melhorando"
          icon={TrendingUp}
          description="Tendência positiva nas últimas 24h"
        />
        <KPICard
          title="Alertas Críticos"
          value="3"
          trend="down"
          trendValue="-2"
          icon={AlertTriangle}
          description="Novos alertas hoje"
        />
        <KPICard
          title="Fontes Ativas"
          value="12"
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
