
import { Form } from 'antd';
import { ReactNode } from 'react';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
type TFromProp = {
    onSubmit: SubmitHandler<FieldValues>;
    children: ReactNode;
} & TFormConfig

type TFormConfig = {
    defaultValues?: Record<string, any>;
    resolver?: any
}

const PHForm = ({ onSubmit, children, defaultValues, resolver }: TFromProp) => {

    const formConfig: TFormConfig = {}

    if (defaultValues) {
        formConfig['defaultValues'] = defaultValues
    }
    if (resolver) {
        formConfig['resolver'] = resolver
    }
    const methods = useForm(formConfig)


    return (
        <FormProvider {...methods}>

            <Form onFinish={methods.handleSubmit(onSubmit)}>
                {children}
            </Form>
        </FormProvider>
    );
};

export default PHForm;