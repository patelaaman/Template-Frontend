import { currentYear, developedBy, developedByLink } from '@/context/constants'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import TextFormInput from '@/components/form/TextFormInput'

const ForgotPassForm = () => {
  const [email, setEmail] = useState<string>('')

  const forgotPassSchema = yup.object({
    email : yup.string().required('Please enter your Email'),
  })
  const { control, handleSubmit, watch, getValues } = useForm({
    resolver: yupResolver(forgotPassSchema),
  })

  useEffect(() => {
    setEmail(getValues().email)
  }, [watch('email')])
  // console.log(email);
  return (
    <form className="mt-3" onSubmit={handleSubmit(() => {})}>
      <div className="mb-3">
        <TextFormInput name="email" control={control} type='string' placeholder="Enter Your Email Address" />
      </div>
      <div className="mb-3">
        <p>
          Back to <Link to="/auth/sign-in">Sign in</Link>
        </p>
      </div>
      <div className="d-grid">
        <Button variant="primary" size="lg" type="submit">
          Reset password
        </Button>
      </div>
      <p className="mb-0 mt-3">
        ©{currentYear}
        <Link target="_blank" to={developedByLink}>
          {developedBy}.
        </Link>
        All rights reserved
      </p>
    </form>
  )
}
export default ForgotPassForm
