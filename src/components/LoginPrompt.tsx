import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './components.scss';

export const LoginPrompt = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <div className="login-distance">
            <Result
                status="403"
                title={t('loginPrompt.title')}
                subTitle={t('loginPrompt.subTitle')}
                extra={
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => navigate('/login')}
                    >
                        {t('loginPrompt.cta')}
                    </Button>
                }
            />
        </div>
    );
};
