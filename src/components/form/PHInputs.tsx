import { Input } from 'antd';
import { Controller } from 'react-hook-form';

type TInputProps = {
    type: string;
    name: string;
    label?: string
}

const PHInput = ({ type, name, label }: TInputProps) => {

    return (
        <div style={{ marginBottom: '16px' }}>
            {label && <label htmlFor={label}>{label}:</label>}
            <Controller
                name={name} render={({ field }) => (
                    <Input {...field} type={type} id={name} />
                )}
            />

        </div>
    );
};

export default PHInput;