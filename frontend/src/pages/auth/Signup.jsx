import AuthCard from '../../components/forms/AuthCard';
import SignupForm from '../../components/forms/SignupForm';

const Signup = () => {
    return (
        <AuthCard 
            title="Create an account" 
            subtitle="Start your fitness journey with AI"
        >
            <SignupForm />
        </AuthCard>
    );
};

export default Signup;
