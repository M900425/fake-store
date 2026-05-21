import { Modal, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

interface IProps {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function LogoutConfirmationModal({
    open,
    onConfirm,
    onCancel,
}: IProps) {
    const { t } = useTranslation();

    return (
        <Modal
            title={t('profilePage.modals.logout.title')}
            open={open}
            onOk={onConfirm}
            onCancel={onCancel}
            okText={t('profilePage.modals.logout.ok')}
            cancelText={t('profilePage.modals.logout.cancel')}
            okButtonProps={{ danger: true }}
        >
            <Text>{t('profilePage.modals.logout.content')}</Text>
        </Modal>
    );
}
