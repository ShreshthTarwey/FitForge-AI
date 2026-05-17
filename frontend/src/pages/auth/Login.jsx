import AuthCard from '../../components/forms/AuthCard';
import LoginForm from '../../components/forms/LoginForm';

const Login = () => {
    return (
        <AuthCard 
            title="Welcome back" 
            subtitle="Sign in to access your AI fitness plans"
        >
            <LoginForm />
        </AuthCard>
    );
};

export default Login;
