import React from 'react';
import MentionCard from '../components/feed/MentionCard';

const Timeline = () => {
    // Mock data
    const mentions = [
        {
            id: 1,
            source: 'Twitter',
            date: 'Há 10 min',
            content: 'A nova política de infraestrutura foi elogiada hoje no congresso. Deputados afirmam que o projeto trará grandes benefícios para a região norte.',
            sentiment: 'positive',
            url: '#',
            author: '@politica_hoje'
        },
        {
            id: 2,
            source: 'G1',
            date: 'Há 32 min',
            content: 'Críticas surgem após declaração sobre o orçamento de 2025. Especialistas apontam riscos fiscais.',
            sentiment: 'negative',
            url: '#',
            author: 'Redação'
        },
        {
            id: 3,
            source: 'DOU',
            date: 'Há 1h',
            content: 'PORTARIA Nº 1.234 - Nomeia novos assessores para o gabinete civil.',
            sentiment: 'neutral',
            url: '#',
            author: 'Diário Oficial'
        }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Linha do Tempo</h1>
                <p className="text-muted-foreground">Acompanhe as citações em tempo real.</p>
            </div>

            <div className="space-y-4 max-w-3xl">
                {mentions.map((mention) => (
                    <MentionCard key={mention.id} {...mention} />
                ))}
            </div>
        </div>
    );
};

export default Timeline;
