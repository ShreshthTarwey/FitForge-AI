import React, { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import Card from '../../components/ui/Card';
import ProfileForm from '../../components/settings/ProfileForm';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/useThemeStore';
import toast from 'react-hot-toast';
import { User, Shield, Bell, Moon } from 'lucide-react';

const Settings = () => {
    const { user, updateProfile } = useAuthStore();
    const { theme, toggleTheme } = useThemeStore();
    const [activeTab, setActiveTab] = useState('profile');

    const handleProfileSubmit = async (data) => {
        const success = await updateProfile(data);
        if (success) {
            toast.success('Profile updated successfully!');
        } else {
            toast.error('Failed to update profile.');
        }
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'preferences', label: 'Preferences', icon: Moon },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-8 max-w-5xl mx-auto">
            <PageHeader 
                title="Account Settings" 
                subtitle="Manage your profile, preferences, and security."
            />

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="w-full lg:w-64 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 hide-scrollbar">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors whitespace-nowrap ${
                                activeTab === tab.id 
                                ? 'bg-slate-800 text-neon-green shadow-sm' 
                                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                            }`}
                        >
                            <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-neon-green' : 'text-slate-500'}`} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1">
                    {activeTab === 'profile' && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <Card>
                                <h3 className="text-xl font-bold text-white mb-6">Profile Information</h3>
                                <ProfileForm user={user} onSubmit={handleProfileSubmit} />
                            </Card>
                        </div>
                    )}
                    
                    {activeTab === 'preferences' && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <Card>
                                <h3 className="text-xl font-bold text-white mb-6">App Preferences</h3>
                                <p className="text-slate-400 mb-4">Customize your visual environment.</p>
                                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                                    <div>
                                        <p className="font-semibold text-white">Dark Mode</p>
                                        <p className="text-xs text-slate-400">Toggle between light and dark modes.</p>
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={toggleTheme}
                                        className={`w-12 h-6 rounded-full relative cursor-pointer transition-all duration-300 ${
                                            theme === 'dark' ? 'bg-neon-green' : 'bg-slate-700'
                                        }`}
                                    >
                                        <div className={`w-5 h-5 bg-slate-950 rounded-full absolute top-0.5 transition-all duration-300 ${
                                            theme === 'dark' ? 'right-0.5' : 'left-0.5'
                                        }`} />
                                    </button>
                                </div>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <Card>
                                <h3 className="text-xl font-bold text-white mb-6">Security</h3>
                                <p className="text-slate-400 mb-6">Manage your password and active sessions.</p>
                                <button className="px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg text-sm font-semibold transition-colors border border-red-500/20">
                                    Logout of all devices
                                </button>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <Card>
                                <h3 className="text-xl font-bold text-white mb-6">Notification Settings</h3>
                                <p className="text-slate-400">Configure email and push notifications here.</p>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
