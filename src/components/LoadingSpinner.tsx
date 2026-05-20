import { Spin } from 'antd';

interface IProps {
    tip: string;
    className?: string;
}

export const LoadingSpinner = ({ tip, className }: IProps) => (
    <div
        className={className}
        style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '100px',
        }}
    >
        <Spin size="large" tip={tip} />
    </div>
);
