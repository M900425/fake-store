import { Modal, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

interface IProps {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function DeleteConfirmationModal({
    open,
    onConfirm,
    onCancel,
}: IProps) {
    const { t } = useTranslation();

    return (
        <Modal
            title={t('cartPage.modals.deleteItem.title')}
            open={open}
            onOk={onConfirm}
            onCancel={onCancel}
            okText={t('cartPage.modals.deleteItem.ok')}
            cancelText={t('cartPage.modals.deleteItem.cancel')}
            okButtonProps={{ danger: true }}
        >
            <Text>{t('cartPage.modals.deleteItem.content')}</Text>
        </Modal>
    );
}
