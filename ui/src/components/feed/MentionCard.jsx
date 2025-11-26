import React from 'react';
import { MessageSquare, Share2, ThumbsUp, ThumbsDown, ExternalLink } from 'lucide-react';
import { cn } from '../../utils/cn';

const MentionCard = ({ source, date, content, sentiment, url, author }) => {
    const isPositive = sentiment === 'positive';
    const isNegative = sentiment === 'negative';

    return (
        <div className="p-4 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                        {source.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold">{source}</h4>
                        <span className="text-xs text-muted-foreground">{date}</span>
                    </div>
                </div>
                <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    isPositive && "bg-green-500/10 text-green-500",
                    isNegative && "bg-red-500/10 text-red-500",
                    !isPositive && !isNegative && "bg-slate-500/10 text-slate-500"
                )}>
                    {isPositive ? 'Positivo' : isNegative ? 'Negativo' : 'Neutro'}
                </span>
            </div>

            <p className="text-sm text-foreground/90 mb-4 leading-relaxed">
                {content}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                        <ThumbsUp size={14} />
                        <span>Gostei</span>
                    </button>
                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors">
                        <ThumbsDown size={14} />
                        <span>Não Gostei</span>
                    </button>
                </div>

                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-primary hover:underline"
                >
                    Ver Original
                    <ExternalLink size={12} />
                </a>
            </div>
        </div>
    );
};

export default MentionCard;
