import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useWorkoutStore } from '../../store/useWorkoutStore';
import WorkoutCard from '../../components/workout/WorkoutCard';
import WorkoutCategoryCard from '../../components/workout/WorkoutCategoryCard';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/ui/EmptyState';
import { Filter } from 'lucide-react';

const mockPlans = [
    { id: 1, title: 'Titan Hypertrophy', goal: 'Muscle Gain', difficulty_level: 'Advanced', description: 'A 4-week brutal hypertrophy program targeting all major muscle groups.', duration_weeks: 4, days_per_week: 5, estimated_calories: 600 },
    { id: 2, end: 'Spartan Shred', goal: 'Weight Loss', difficulty_level: 'Intermediate', description: 'HIIT and strength circuits to maximize fat loss while preserving muscle.', duration_weeks: 6, days_per_week: 4, estimated_calories: 750 },
    { id: 3, title: 'Foundation Builder', goal: 'General Fitness', difficulty_level: 'Beginner', description: 'Perfect for those just starting out. Focuses on form and foundational strength.', duration_weeks: 8, days_per_week: 3, estimated_calories: 400 },
];

const WorkoutPlans = () => {
    const navigate = useNavigate();
    const { categories, fetchCategories, plans, fetchPlans, isLoading } = useWorkoutStore();
    const [view, setView] = useState('plans'); // 'plans' | 'categories'
    const [categoryFilter, setCategoryFilter] = useState('All');

    useEffect(() => {
        fetchCategories();
        fetchPlans();
    }, [fetchCategories, fetchPlans]);

    const handleViewPlan = (plan) => {
        navigate(`/workouts/${plan.id}`, { state: { plan } });
    };

    // Filter plans dynamically based on category
    const displayedPlans = [...plans, ...mockPlans].filter(plan => {
        if (categoryFilter === 'All') return true;
        
        if (categoryFilter === 'AI Generated Plans') {
            return plan.is_generated === true || plan.is_generated === 1 || String(plan.title || '').toLowerCase().includes('ai generated');
        }
        
        const type = plan.workout_type || plan.goal || '';
        
        if (categoryFilter.toLowerCase().includes('strength') && (type.toLowerCase().includes('strength') || type.toLowerCase().includes('muscle'))) {
            return true;
        }
        if (categoryFilter.toLowerCase().includes('hiit') && (type.toLowerCase().includes('hiit') || type.toLowerCase().includes('weight') || type.toLowerCase().includes('cardio'))) {
            return true;
        }
        if (categoryFilter.toLowerCase().includes('yoga') && (type.toLowerCase().includes('yoga') || type.toLowerCase().includes('flexibility') || type.toLowerCase().includes('mobility'))) {
            return true;
        }
        if (categoryFilter.toLowerCase().includes('bodyweight') && (type.toLowerCase().includes('bodyweight') || type.toLowerCase().includes('strength') || type.toLowerCase().includes('general'))) {
            return true;
        }
        
        return false;
    });

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-8">
            <PageHeader 
                title="Workout Library" 
                subtitle="Browse your generated plans or explore new categories."
                action={
                    <Button onClick={() => navigate('/workouts/generate')}>
                        Generate New Plan
                    </Button>
                }
            />

            {/* Toggle View */}
            <div className="flex gap-4 mb-8 border-b border-slate-700/50 pb-4">
                <button 
                    className={`text-sm font-semibold pb-4 -mb-4 transition-colors ${view === 'plans' ? 'text-neon-green border-b-2 border-neon-green' : 'text-slate-400 hover:text-white'}`}
                    onClick={() => setView('plans')}
                >
                    My Plans
                </button>
                <button 
                    className={`text-sm font-semibold pb-4 -mb-4 transition-colors ${view === 'categories' ? 'text-neon-green border-b-2 border-neon-green' : 'text-slate-400 hover:text-white'}`}
                    onClick={() => setView('categories')}
                >
                    Categories
                </button>
            </div>

            {view === 'plans' && (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        {categoryFilter !== 'All' ? (
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold bg-neon-green/10 border border-neon-green/20 text-neon-green px-3 py-1 rounded-lg">
                                    Category: {categoryFilter}
                                </span>
                                <button 
                                    onClick={() => setCategoryFilter('All')} 
                                    className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                                >
                                    Clear Filter
                                </button>
                            </div>
                        ) : <div />}
                        
                        <Button variant="ghost" className="text-slate-400">
                            <Filter className="w-4 h-4 mr-2" />
                            Filter
                        </Button>
                    </div>

                    {isLoading ? (
                        <Loader />
                    ) : displayedPlans.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayedPlans.map((plan, i) => (
                                <div key={plan.id || i} className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}>
                                    <WorkoutCard plan={plan} onView={handleViewPlan} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState 
                            title="No workout plans yet" 
                            description="Generate your first AI-powered workout plan to get started."
                            actionLabel="Generate Plan"
                            onAction={() => navigate('/workouts/generate')}
                        />
                    )}
                </div>
            )}

            {view === 'categories' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category, i) => (
                        <WorkoutCategoryCard 
                            key={category.id} 
                            title={category.title} 
                            description={category.description} 
                            imageGradient={category.gradient}
                            delay={i * 0.1}
                            onClick={() => {
                                setCategoryFilter(category.title);
                                setView('plans');
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default WorkoutPlans;
