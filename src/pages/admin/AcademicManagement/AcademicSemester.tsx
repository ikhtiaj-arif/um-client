import { Table, TableColumnsType, TableProps } from 'antd';
import { useState } from 'react';
import { useGetAllSemestersQuery } from '../../../redux/features/admin/academicManagement.api';
import { TQueryParam } from '../../../types';
import { TAcademicSemester } from '../../../types/academicManagement.type';



export type TTableData = Pick<TAcademicSemester, "name" | "endMonth" | "startMonth" | "year">

const AcademicSemester = () => {
    const [params, setParams] = useState<TQueryParam[] | undefined>(undefined)
    const { data: semesterData, isLoading, isFetching } = useGetAllSemestersQuery(params)

    console.log(isLoading, isFetching);

    const tableData = semesterData?.data?.map(({ _id, name, startMonth, endMonth, year }) => ({
        key: _id,

        name, startMonth, endMonth, year
    }))


    const columns: TableColumnsType<TTableData> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            showSorterTooltip: { target: 'full-header' },
            filters: [
                {
                    text: 'Autumn',
                    value: 'Autumn',
                },
                {
                    text: 'Fall',
                    value: 'Fall',
                },
                {
                    text: 'Summer',
                    value: 'summer',
                },
            ], // specify the condition of filtering result
            // here is that finding the name started with `value`

        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
            defaultSortOrder: 'descend',
            filters: [
                {
                    text: '2024',
                    value: '2024',
                },
                {
                    text: '2025',
                    value: '2025',
                },
                {
                    text: '2026',
                    value: '2026',
                },
            ],

        },
        {
            title: 'Start Month',
            dataIndex: 'startMonth',
            key: 'startMonth',

        },
        {
            title: 'End Month',
            dataIndex: 'endMonth',
            key: 'endMonth',

        },
    ];


    const onChange: TableProps<TTableData>['onChange'] = (_pagination, filters, _sorter, extra) => {
        if (extra.action === 'filter') {
            const queryParams: TQueryParam[] = []

            filters.name?.forEach(item => (queryParams.push({ name: "name", value: item })))
            setParams(queryParams);

            filters.year?.forEach(item => (queryParams.push({ name: "year", value: item })))
            setParams(queryParams);
        }
    };


    if (isLoading) {
        return <p>Loading...</p>
    }
    return (
        <div>
            <Table<TTableData>
                loading={isFetching}
                columns={columns}
                dataSource={tableData}
                onChange={onChange}
                showSorterTooltip={{ target: 'sorter-icon' }}
            />
        </div >
    );
};

export default AcademicSemester;