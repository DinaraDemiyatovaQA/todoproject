import ReactDOM from 'react-dom';

import './ConfirmationDialog.css';

const Background = (props) => {
    return <div className="background" onClick={props.onClose} />;
};

const DialogOverlay = (props) => {
    return (
        <div className="dialog">
            <div>{props.children}</div>
        </div>
    );
};

const portalElement = document.getElementById('overlay');

const ConfirmationDialog = (props) => {
    return (
        <>
            {ReactDOM.createPortal(
                <Background onClose={props.onClose} />,
                portalElement
            )}
            {ReactDOM.createPortal(
                <DialogOverlay>{props.children}</DialogOverlay>,
                portalElement
            )}
        </>
    );
};

export default ConfirmationDialog;
