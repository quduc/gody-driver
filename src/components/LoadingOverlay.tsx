import React from 'react';
import { Modal, View, ActivityIndicator } from 'react-native';
import { colors } from '../contants/colors';

interface PropsType {
    title?: string;
    loading: boolean;
};

export const LoadingOverlay = ({ loading, ...rest }: PropsType) => (
    <Modal animationType='fade' transparent visible={loading} {...rest}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <ActivityIndicator size={'large'} color={colors.primary1} />
        </View>
    </Modal>
);

