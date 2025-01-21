import { Layout, Menu } from 'antd';
import { selectCurrentUser } from '../../redux/features/auth/authSlice';
import { useAppSelector } from '../../redux/hooks';
import { adminPaths } from '../../routes/admin.routes';
import { facultyPaths } from '../../routes/faculty.routes';
import { studentPaths } from '../../routes/student.routes';
import { sideBarItemsGenerator } from '../../utils/sidebarItemsGenerator';

const { Sider } = Layout;

const userRole = {
    ADMIN: 'admin',
    FACULTY: 'faculty',
    STUDENT: 'student',

}

const Sidebar = () => {

    // const role = "faculty"
    const user = useAppSelector(selectCurrentUser)

    let sidebarItems;

    switch (user!.role) {
        case userRole.ADMIN:
            sidebarItems = sideBarItemsGenerator(adminPaths, userRole.ADMIN)
            break;
        case userRole.FACULTY:
            sidebarItems = sideBarItemsGenerator(facultyPaths, userRole.FACULTY)
            break;
        case userRole.STUDENT:
            sidebarItems = sideBarItemsGenerator(studentPaths, userRole.STUDENT)
            break;

        default:
            break;
    }

    return (
        <Sider
            style={{ height: '100vh', position: 'sticky', top: '0', left: '0' }}
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <div style={{ color: "white", textAlign: "center", height: '4rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                <h1>
                    PH Uni
                </h1>
            </div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['4']}
                items={sidebarItems} />
        </Sider>
    );
};

export default Sidebar;