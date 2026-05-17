import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar, { navItems } from '../components/common/Sidebar';
import MobileSidebar from '../components/common/MobileSidebar';
import TopNavbar from '../components/common/TopNavbar';
import PageContainer from '../components/common/PageContainer';
import FloatingQuickActions from '../components/ui/FloatingQuickActions';
import AICoachPanel from '../components/ai/AICoachPanel';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-slate-900 text-white">
            <MobileSidebar 
                isOpen={sidebarOpen} 
                setIsOpen={setSidebarOpen} 
                navItems={navItems} 
            />
            
            <Sidebar />
            
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-slate-900">
                <TopNavbar onOpenSidebar={() => setSidebarOpen(true)} />
                <PageContainer>
                    <Outlet />
                </PageContainer>
                <FloatingQuickActions />
                <AICoachPanel />
            </div>
        </div>
    );
};

export default DashboardLayout;
