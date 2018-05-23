import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import { withTheme } from '@material-ui/core/styles';
import { hideNotification as hideNotificationAction } from '~/actions/notificationActions';

function getStyles(theme) {
    if (!theme) return { error: '#00bcd4', secondary: '#ff4081' };
    const {
        palette: { error, secondary },
    } = theme
    return { errorColor: error.light, secondaryColor: secondary.light };
}

class Notification extends React.Component {
    handleRequestClose = () => {
        this.props.hideNotification();
    };

    render() {
        const style = {};
        const { type, message, theme } = this.props;
        const { errorColor, secondaryColor } = getStyles(theme);
        style.backgroundColor = errorColor
        if (type === 'warning') {
            style.backgroundColor = secondaryColor;
        }
        return (
            <Snackbar
                open={!!message}
                message={!!message && message}
                autoHideDuration={4000}
                onClose={this.handleRequestClose}
                style={style}
                ContentProps={{
                    style: style
                }}
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