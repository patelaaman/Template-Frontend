import PasswordFormInput from '@/components/form/PasswordFormInput';
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LIVE_URL } from '@/utils/api';
import { toast } from 'react-toastify'; // Import toast from react-toastify

const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token'); // Get token from URL params

  const resetPasswordSchema = yup.object({
    password: yup.string().required('Please Enter Your Password'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords Must Match')
      .required('Please Confirm Your Password'),
  });

  const { control, handleSubmit, getValues, watch, reset } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  useEffect(() => {
    setPassword(getValues().password);
    setConfirmPassword(getValues().confirmPassword);
  }, [watch('password'), watch('confirmPassword')]);

  const handleResetPassword = async () => {
    setLoading(true);
    setMessage(null);

    const newPassword = getValues().password;
    const confirmPassword = getValues().confirmPassword;

    // Check if passwords match before making the API call
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${LIVE_URL}api/v1/auth/reset-pass`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (data.success) {
        // Show success toast
        toast.success('Password changed successfully!',{
            position : 'top-right'
        });

        setTimeout(() => navigate('/auth/sign-in'), 2000); // Redirect after success
      }
    } catch (error) {
      setMessage('Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="mt-4"
      onSubmit={handleSubmit(() => handleResetPassword())}
    >
      <div className="mb-3 position-relative">
        <PasswordFormInput
          name="password"
          control={control}
          size="lg"
          placeholder="Enter New Password"
        />
        <div className="mt-2">
          <PasswordStrengthMeter password={password} />
        </div>
      </div>
      <PasswordFormInput
        name="confirmPassword"
        control={control}
        size="lg"
        containerClassName="mb-3"
        placeholder="Confirm Password"
      />
      <div className="d-grid">
        <Button variant="primary" type="submit" size="lg" disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </Button>
      </div>
      {message && <div className="mt-3">{message}</div>}
    </form>
  );
};

export default ResetPasswordForm;
