import { Typography } from 'antd';
import './components.scss';

const { Title } = Typography;

interface PageHeaderProps {
    title: string;
    actionNode?: React.ReactNode;
}

export const PageHeader = ({ title, actionNode }: PageHeaderProps) => {
    return (
        <div className="page-header-root">
            <Title level={2} className="page-title">
                {title}
            </Title>
            {actionNode && <div>{actionNode}</div>}
        </div>
    );
};
