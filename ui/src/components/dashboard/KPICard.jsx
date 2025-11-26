import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';

const KPICard = ({ title, value, trend, trendValue, icon: Icon, description }) => {
    const isPositive = trend === 'up';
    const isNegative = trend === 'down';

    return (
        <div className="p-6 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
                {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
            </div>

            <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{value}</span>
                {trendValue && (
                    <span className={cn(
                        "flex items-center text-xs font-medium",
                        isPositive && "text-green-500",
                        isNegative && "text-red-500",
                        !isPositive && !isNegative && "text-muted-foreground"
                    )}>
                        {isPositive && <ArrowUpRight className="w-3 h-3 mr-1" />}
                        {isNegative && <ArrowDownRight className="w-3 h-3 mr-1" />}
                        {trendValue}
                    </span>
                )}
            </div>

            {description && (
                <p className="mt-1 text-xs text-muted-foreground">{description}</p>
            )}
        </div>
    );
};

export default KPICard;
