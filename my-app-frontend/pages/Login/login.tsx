import type { NextPage } from 'next'

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Link from '../../components/link';
import Layout from '../../components/account';
import { userService, alertService } from '../../services/generic';

const Login: NextPage = () => {
  const router = useRouter();

  // form validation rules 
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  interface SubmitData {
    username: string;
    password: string;
  };

  const onSubmit = async ({ username, password }: SubmitData): Promise<void> => {
    try {
      await userService.login(username, password);
      const returnUrl: string = router.query.returnUrl![0] || '/';
      await router.push(returnUrl);
    } catch (error: any) {
      alertService.error(error.message, null);
    }
  }

  return (
    <Layout>
      <div className="card">
        <h4 className="card-header">Login</h4>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                {...register('username')}
                className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
              <div className="invalid-feedback">{errors.username?.message}</div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                {...register('password')}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <button disabled={formState.isSubmitting} className="btn btn-primary">
              {
                formState.isSubmitting
                &&
                <span className="spinner-border spinner-border-sm mr-1">
                </span>
              }
              Login
            </button>
            <Link href="/account/register" className="btn btn-link">
              Register
            </Link>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Login;