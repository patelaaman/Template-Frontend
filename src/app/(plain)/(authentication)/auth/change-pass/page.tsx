import { Card } from 'react-bootstrap'
import ForgotPassForm from './components/ChangePassForm';
import AuthLayout from '../components/AuthLayout'
import PageMetaData from '@/components/PageMetaData'
import ResetPasswordForm from './components/ChangePassForm';

const ForgotPassword = () => {
  return (
    <>
      <PageMetaData title='Forgot Password' />
      <AuthLayout>
        <Card className="card-body rounded-3 text-center p-4 p-sm-5">
          <h1 className="mb-2">Enter New Password</h1>
          <p>Enter the New Password you want for your Email.</p>
          <ResetPasswordForm />
        </Card>
      </AuthLayout>
    </>
  )
}

export default ForgotPassword
