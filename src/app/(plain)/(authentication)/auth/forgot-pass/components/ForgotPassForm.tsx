import { currentYear, developedBy, developedByLink } from '@/context/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button, Alert, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import TextFormInput from '@/components/form/TextFormInput';
import { LIVE_URL } from '@/utils/api';

const ForgotPassForm = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const forgotPassSchema = yup.object({
    email: yup.string().email('Invalid email format').required('Please enter your Email'),
  });

  const { control, handleSubmit, getValues } = useForm({
    resolver: yupResolver(forgotPassSchema),
  });

  /** 
   * Sends password reset email 
   */
  const handleSendResetEmail = async () => {
    setLoading(true);
    setMessage(null);

    const email = getValues().email;
    const resetLink = `${window.location.origin}/auth/change-password`;

    try {
      const response = await fetch(`${LIVE_URL}api/v1/auth/reset-pass-req`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toEmail: email, resetLink }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-3" onSubmit={handleSubmit(handleSendResetEmail)}>
      {message && <Alert variant={message.includes('Failed') ? 'danger' : 'success'}>{message}</Alert>}
      
      <div className="mb-3">
        <TextFormInput name="email" control={control} type="email" placeholder="Enter Your Email Address" />
      </div>

      <div className="mb-3">
        <p>
          Back to <Link to="/auth/sign-in">Sign in</Link>
        </p>
      </div>

      <div className="d-grid">
        <Button variant="primary" size="lg" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Send Reset Email'}
        </Button>
      </div>

      <p className="mb-0 mt-3">
        ©{currentYear}
        <Link target="_blank" to={developedByLink}>{developedBy}.</Link> All rights reserved.
      </p>
    </form>
  );
};

export default ForgotPassForm;
