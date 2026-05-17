import AuthCard from '../../components/forms/AuthCard';
import ForgotPasswordForm from '../../components/forms/ForgotPasswordForm';

const ForgotPassword = () => {
    return (
        <AuthCard 
            title="Reset Password" 
            subtitle="Enter your email to receive a reset link"
        >
            <ForgotPasswordForm />
        </AuthCard>
    );
};

export default ForgotPassword;
