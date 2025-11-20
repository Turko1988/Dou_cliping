import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Clock, Settings, Menu, X, ShieldAlert } from 'lucide-react';
import { cn } from '../../utils/cn';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { icon: LayoutDashboard, label: 'Visão Geral', path: '/dashboard' },
        { icon: Clock, label: 'Linha do Tempo', path: '/timeline' },
        { icon: Settings, label: 'Ajustes', path: '/settings' },
    ];

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 right-4 z-50 p-2 bg-card border border-border rounded-md text-foreground"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar Container */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex flex-col h-full p-4">
                    {/* Logo */}
                    <div className="flex items-center gap-2 px-2 mb-8">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <ShieldAlert className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">Sentinela</span>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-1 flex-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) => cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                )}
                            >
                                <item.icon size={20} />
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* User Profile (Mock) */}
                    <div className="mt-auto pt-4 border-t border-border">
                        <div className="flex items-center gap-3 px-2">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                                AD
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">Admin User</span>
                                <span className="text-xs text-muted-foreground">admin@sentinela.gov</span>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default Sidebar;
