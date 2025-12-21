import { Ionicons } from '@expo/vector-icons';
import React, { ReactNode } from 'react';
import {
    Dimensions,
    Modal,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface GenericModalProps {
    visible: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    showCloseButton?: boolean;
    type?: 'default' | 'success' | 'error' | 'warning' | 'info';
    animationType?: 'slide' | 'fade' | 'none';
    closable?: boolean;
}

export const GenericModal: React.FC<GenericModalProps> = ({
    visible,
    onClose,
    title,
    children,
    showCloseButton = true,
    type = 'default',
    animationType = 'fade',
    closable = true,
}) => {
    const getModalColors = () => {
        switch (type) {
            case 'success':
                return {
                    headerColor: '#4CAF50',
                    iconName: 'checkmark-circle' as const,
                };
            case 'error':
                return {
                    headerColor: '#F44336',
                    iconName: 'close-circle' as const,
                };
            case 'warning':
                return {
                    headerColor: '#FF9800',
                    iconName: 'warning' as const,
                };
            case 'info':
                return {
                    headerColor: '#2196F3',
                    iconName: 'information-circle' as const,
                };
            default:
                return {
                    headerColor: '#FF6B35',
                    iconName: 'apps' as const,
                };
        }
    };

    const { headerColor, iconName } = getModalColors();

    const handleBackdropPress = () => {
        if (closable) {
            onClose();
        }
    };

    return (
        <Modal
            animationType={animationType}
            transparent={true}
            visible={visible}
            onRequestClose={closable ? onClose : undefined}
            statusBarTranslucent={true}
        >
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.8)" barStyle="light-content" />
            
            {/* Backdrop */}
            <TouchableOpacity
                style={styles.backdrop}
                activeOpacity={1}
                onPress={handleBackdropPress}
            >
                {/* Modal Container */}
                <TouchableOpacity
                    style={[styles.modalContainer, { borderTopColor: headerColor }]}
                    activeOpacity={1}
                    onPress={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    {(title || showCloseButton) && (
                        <View style={styles.header}>
                            <View style={styles.headerLeft}>
                                <View style={[styles.iconContainer, { backgroundColor: `${headerColor}20` }]}>
                                    <Ionicons 
                                        name={iconName} 
                                        size={24} 
                                        color={headerColor} 
                                    />
                                </View>
                                {title && (
                                    <Text style={styles.title} numberOfLines={1}>
                                        {title}
                                    </Text>
                                )}
                            </View>
                            
                            {showCloseButton && closable && (
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={onClose}
                                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                >
                                    <Ionicons name="close" size={20} color="#888" />
                                </TouchableOpacity>
                            )}
                        </View>
                    )}

                    {/* Content */}
                    <View style={styles.content}>
                        {children}
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

// Componentes específicos para casos comunes
interface ConfirmModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'default' | 'danger' | 'warning';
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    visible,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    type = 'default',
}) => {
    const getConfirmButtonStyle = () => {
        switch (type) {
            case 'danger':
                return { backgroundColor: '#F44336' };
            case 'warning':
                return { backgroundColor: '#FF9800' };
            default:
                return { backgroundColor: '#FF6B35' };
        }
    };

    return (
        <GenericModal
            visible={visible}
            onClose={onClose}
            title={title}
            type={type === 'danger' ? 'error' : type === 'warning' ? 'warning' : 'default'}
            showCloseButton={false}
        >
            <Text style={styles.message}>{message}</Text>
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={onClose}
                >
                    <Text style={styles.cancelButtonText}>{cancelText}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={[styles.confirmButton, getConfirmButtonStyle()]}
                    onPress={() => {
                        onConfirm();
                        onClose();
                    }}
                >
                    <Text style={styles.confirmButtonText}>{confirmText}</Text>
                </TouchableOpacity>
            </View>
        </GenericModal>
    );
};

interface InfoModalProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    message: string;
    buttonText?: string;
    type?: 'success' | 'error' | 'warning' | 'info';
}

export const InfoModal: React.FC<InfoModalProps> = ({
    visible,
    onClose,
    title,
    message,
    buttonText = 'Entendido',
    type = 'info',
}) => {
    return (
        <GenericModal
            visible={visible}
            onClose={onClose}
            title={title}
            type={type}
            showCloseButton={false}
        >
            <Text style={styles.message}>{message}</Text>
            
            <TouchableOpacity
                style={styles.singleButton}
                onPress={onClose}
            >
                <Text style={styles.singleButtonText}>{buttonText}</Text>
            </TouchableOpacity>
        </GenericModal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    modalContainer: {
        backgroundColor: '#2a2a2a',
        borderRadius: 16,
        minWidth: screenWidth * 0.85,
        maxWidth: screenWidth * 0.95,
        maxHeight: screenHeight * 0.8,
        borderTopWidth: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.5,
        shadowRadius: 16,
        elevation: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#3a3a3a',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        flex: 1,
    },
    closeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(136, 136, 136, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    message: {
        fontSize: 16,
        color: '#cccccc',
        lineHeight: 24,
        marginBottom: 24,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#3a3a3a',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#4a4a4a',
    },
    cancelButtonText: {
        color: '#cccccc',
        fontSize: 16,
        fontWeight: '600',
    },
    confirmButton: {
        flex: 1,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    singleButton: {
        backgroundColor: '#FF6B35',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
    },
    singleButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});