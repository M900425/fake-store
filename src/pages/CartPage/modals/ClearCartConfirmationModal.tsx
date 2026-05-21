import { Modal, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

interface IProps {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ClearCartConfirmationModal({
    open,
    onConfirm,
    onCancel,
}: IProps) {
    const { t } = useTranslation();

    return (
        <Modal
            title={t('cartPage.modals.clearCart.title')}
            open={open}
            onOk={onConfirm}
            onCancel={onCancel}
            okText={t('cartPage.modals.clearCart.ok')}
            cancelText={t('cartPage.modals.clearCart.cancel')}
            okButtonProps={{ danger: true }}
        >
            <Text>{t('cartPage.modals.clearCart.content')}</Text>
        </Modal>
    );
}
