import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

// Pagination.propTypes = {
//     pagination: PropTypes.object.isRequired,
//     onPageChange: PropTypes.func,
// };

// Pagination.defaultProps = {
//     onPageChange: null
// }

const Pagination = (props) => {
    const { pagination, onPageChange } = props;
    const { page, limit, total } = pagination;
    const totalPage = Math.ceil(total / limit);

    const handlePageChange = (newPage) => {
        if (onPageChange) onPageChange(newPage);
    }

    return (
        <View style={styles.container}>
            <Button
                mode="contained"
                onPress={() => handlePageChange(page - 1)}
                uppercase={false}
                disabled={page <= 1}
            >
                <Icon name="chevron-back-outline" size={20} color="#fff" />
            </Button>
            <Button
                disabled
                labelStyle={{ color: "#fff", fontFamily: "Montserrat" }}
            >
                {page}
            </Button>
            <Button
                mode="contained"
                onPress={() => handlePageChange(page + 1)}
                uppercase={false}
                disabled={page >= totalPage}
            >
                <Icon name="chevron-forward-outline" size={20} color="#fff" />
            </Button>
        </View>
    )
}

export default Pagination

const styles = StyleSheet.create({
    container: { flexDirection: "row", justifyContent: "center" }
})