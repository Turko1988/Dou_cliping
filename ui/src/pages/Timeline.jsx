import React, { useEffect, useState } from 'react';
import MentionCard from '../components/feed/MentionCard';
import { api } from '../services/api';

const Timeline = () => {
    const [mentions, setMentions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMentions = async () => {
            try {
                // Busca termos genéricos para demonstração
                const results = await api.searchDOU('portaria');

                // Mapeia os resultados do DOU para o formato do MentionCard
                const mappedMentions = results.map((item, index) => ({
                    id: index,
                    source: 'DOU',
                    date: new Date().toLocaleDateString('pt-BR'), // Data simulada pois o scraper pode não retornar data formatada
                    content: item.abstract || item.title || 'Conteúdo não disponível',
                    sentiment: 'neutral', // DOU geralmente é neutro
                    url: item.url || '#',
                    author: 'Diário Oficial da União'
                }));

                setMentions(mappedMentions);
            } catch (error) {
                console.error("Erro ao carregar timeline:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMentions();
    }, []);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Linha do Tempo</h1>
                <p className="text-muted-foreground">Acompanhe as citações em tempo real.</p>
            </div>

            <div className="space-y-4 max-w-3xl">
                {loading ? (
                    <div className="text-center text-muted-foreground p-8">Carregando citações...</div>
                ) : mentions.length > 0 ? (
                    mentions.map((mention) => (
                        <MentionCard key={mention.id} {...mention} />
                    ))
                ) : (
                    <div className="text-center text-muted-foreground p-8">Nenhuma citação encontrada.</div>
                )}
            </div>
        </div>
    );
};

export default Timeline;
