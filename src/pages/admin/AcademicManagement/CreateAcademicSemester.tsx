import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Col, Flex } from 'antd';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import PHForm from '../../../components/form/PHForm';
import UMSelect from '../../../components/form/UMSelect';
import { monthOptions } from '../../../constants/global';
import { semesterOptions } from '../../../constants/semester';
import { useAddAcademicSemestersMutation } from '../../../redux/features/admin/academicManagement.api';
import { academicSemesterSchema } from '../../../schemas/academicManagement.schema';
import { TResponse } from '../../../types/global';



const nameOptions = [
    {
        value: "01", label: "Autumn"
    },
    {
        value: "02", label: "Summer"
    },
    {
        value: "03", label: "Fall"
    },

]

const currentYear = new Date().getFullYear()
const yearOptions = [0, 1, 2, 3, 4].map(number => ({
    value: String(currentYear + number),
    label: String(currentYear + number)
}))
console.log(yearOptions);

const CreateAcademicSemester = () => {


    const [addAcademicSemester] = useAddAcademicSemestersMutation()


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Creating...')
        const name = nameOptions[Number(data?.name) - 1]?.label

        const semesterData = {
            name,
            code: data.name,
            year: data.year,
            startMonth: data.startMonth,
            endMonth: data.endMonth
        }
        try {
            const res = (await addAcademicSemester(semesterData)) as TResponse
            if (res.error) {
                toast.error(res.error.data.message, { id: toastId })
            } else {
                toast.success('Semester Created!', { id: toastId })
            }
            console.log(res);
        } catch (err) {
            toast.error('Something went wrong', { id: toastId })
            console.log(err);
        }
    }



    return (
        <Flex justify='center' align='center' >
            <Col span={6}>
                <PHForm onSubmit={onSubmit} resolver={zodResolver(academicSemesterSchema)}>
                    <UMSelect label='Name' name={'name'} options={semesterOptions} />
                    <UMSelect label='Year' name={'year'} options={yearOptions} />
                    <UMSelect label='Start Month' name={'startMonth'} options={monthOptions} />
                    <UMSelect label='End Month' name={'endMonth'} options={monthOptions} />
                    <Button htmlType='submit'>Submit</Button>
                </PHForm>
            </Col>
        </Flex>
    );
};

export default CreateAcademicSemester;