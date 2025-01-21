import { Button, Col, Flex } from 'antd';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import PHForm from '../../../components/form/PHForm';
import UMSelect from '../../../components/form/UMSelect';
import { monthOptions } from '../../../constants/global';
import { semesterOptions } from '../../../constants/semester';
import { zodResolver } from '@hookform/resolvers/zod';
import { string, z } from 'zod';


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
    const onSubmit: SubmitHandler<FieldValues> = (data) => {

        const name = nameOptions[Number(data?.name) - 1]?.label

        const semesterData = {
            name,
            code: data.name,
            year: data.year,
            startMonth: data.startMonth,
            endMonth: data.endMonth
        }

        console.log(semesterData);
    }

   const academicSemesterSchema = z.object({
        name: z.string({
            required_error: 'Please select a Name'
        }),
        year: z.string({
            required_error: 'Please select a Year'
        }),
        startMonth: z.string({
            required_error: 'Please select a Start month'
        }),
        endMonth: z.string({
            required_error: 'Please select an End month'
        }),
    })

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