import { Button, Row } from 'antd';
import { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PHForm from '../components/form/PHForm';
import PHInput from '../components/form/PHInputs';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { useAppDispatch } from '../redux/hooks';
import { toast } from 'sonner';
import { verifyToken } from '../utils/verifyToken';
import { setUser, TUser } from '../redux/features/auth/authSlice';


const Login = () => {
    const navigate = useNavigate()

    // const { register, handleSubmit } = useForm({
    //     defaultValues: {
    //         userId: 'A-0002',
    //         password: '1234'
    //     }
    // })

    const defaultValues = {
        userId: 'A-0002',
        password: '1234',
    }


    const [login] = useLoginMutation()

    const dispatch = useAppDispatch()

    const onSubmit = async (data: FieldValues) => {
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
        // console.log(data);
    }

    return (
        <Row justify="center" align='middle' style={{ height: " 100vh" }}>
            <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
                <PHInput type='text' name='userId' label='ID' />
                <PHInput type='password' name='password' label='Password' />
                <Button htmlType='submit' >Login</Button>
            </PHForm></Row>
    );
};

export default Login;