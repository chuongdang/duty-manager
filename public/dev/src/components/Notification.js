import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import { withTheme } from '@material-ui/core/styles';
import { hideNotification as hideNotificationAction } from '~/actions/notificationActions';

function getStyles(theme) {
    if (!theme) return { primary1Color: '#00bcd4', accent1Color: '#ff4081' };
    const {
        palette: { primary1Color, accent1Color },
    } = theme
    return { primary1Color, accent1Color };
}

class Notification extends React.Component {
    handleRequestClose = () => {
        this.props.hideNotification();
    };

    render() {
        const style = {};
        const { type, message, theme } = this.props;
        const { primary1Color, accent1Color } = getStyles(theme);
        if (type === 'warning') {
            style.backgroundColor = accent1Color;
        }
        if (type === 'confirm') {
            style.backgroundColor = primary1Color;
        }
        return (
            <Snackbar
                open={!!message}
                message={!!message && message}
                autoHideDuration={4000}
                onClose={this.handleRequestClose}
                styles={style}
            />
        );
    }
}

Notification.propTypes = {
    message: PropTypes.string,
    type: PropTypes.string.isRequired,
    hideNotification: PropTypes.func.isRequired,
};

Notification.defaultProps = {
    type: 'info',
};

const mapStateToProps = state => ({
  message: state.notification.text,
  type: state.notification.type,
});

const mapDispatchToProps = {
  hideNotification: hideNotificationAction
}

Notification = connect(mapStateToProps, mapDispatchToProps)(Notification)

export default withTheme()(Notification);