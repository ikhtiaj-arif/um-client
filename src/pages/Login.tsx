import { Button } from 'antd';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { setUser, TUser } from '../redux/features/auth/authSlice';
import { useAppDispatch } from '../redux/hooks';
import { verifyToken } from '../utils/verifyToken';


const Login = () => {
    const navigate = useNavigate()

    const { register, handleSubmit } = useForm({
        defaultValues: {
            userId: 'A-0002',
            password: '1234'
        }
    })

    const [login] = useLoginMutation()

    const dispatch = useAppDispatch()

    const onSubmit = async (data:FieldValues) => {
        const toastId = toast.loading('Logging in')
        try {
            const userInfo = {
                id: data.userId,
                password: data.password
            }
            const res = await login(userInfo).unwrap()
            const user = verifyToken(res?.data?.accessToken) as TUser
            dispatch(setUser({ user: user, token: res.data.accessToken }))
            navigate(`/${user.role}/dashboard`)
            toast.success('Logged in', { id: toastId })

        } catch (err) {
            toast.error('something went wrong', { id: toastId })
            console.log(err);
        }


    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="id">ID:</label>
                <input type="text" id='id' {...register("userId")} />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id='password' {...register("password")} />
            </div>
            <Button htmlType='submit' >Login</Button>
        </form>
    );
};

export default Login;