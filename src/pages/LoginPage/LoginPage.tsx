import { Form, Input, Button, Card, Typography, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { login } from '@/store/authSlice';
import { useLoginMutation } from '@/api/productApi';
import './LoginPage.scss';
import type { LoginCredentials } from '@/types/auth';

const { Title } = Typography;

export default function LoginPage() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginMutation, { isLoading }] = useLoginMutation();
    const onFinish = async (values: LoginCredentials) => {
        try {
            const data = await loginMutation(values).unwrap();
            dispatch(login({ name: values.username, token: data.token }));
            message.success(t('loginPage.messages.success'));
            navigate('/profile');
        } catch {
            message.error(t('loginPage.messages.error'));
        }
    };

    return (
        <div className="login-page-root">
            <Card className="login-card">
                <Title level={3} className="login-title">
                    {t('loginPage.title')}
                </Title>
                <div className="login-hint">
                    <span
                        className="ant-typography ant-typography-secondary"
                        dangerouslySetInnerHTML={{
                            __html: t('loginPage.hint'),
                        }}
                    />
                </div>
                <Form onFinish={onFinish} layout="vertical">
                    <Form.Item
                        name="username"
                        label={t('loginPage.username')}
                        required={false}
                        normalize={(value) => value?.trim()}
                        rules={[
                            {
                                required: true,
                                message: t('loginPage.validation.username'),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label={t('loginPage.password')}
                        required={false}
                        normalize={(value) => value?.trim()}
                        rules={[
                            {
                                required: true,
                                message: t('loginPage.validation.password'),
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <div className="buttons-section">
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={isLoading}
                        >
                            {t('loginPage.signIn')}
                        </Button>
                        <Button block onClick={() => navigate('/catalog/all')}>
                            {t('loginPage.backToCatalog')}
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
}
