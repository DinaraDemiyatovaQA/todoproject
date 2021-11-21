import ConfirmationDialog from '../../../common/ConfirmationDialog/index';

import './DeleteConfirmation.css';


const DeleteConfirmation = (props) => {

    const question = 'Are you sure you want to delete this Todo?';

    const deleteConfirmingHandler = () => {
        props.onConfirm();
        props.onClose();
    };

    return (
        <ConfirmationDialog onClose={props.onClose}>
            <div className="question">
                <span>{question}</span>
                <div className="actions">
                    <button onClick={deleteConfirmingHandler}>Confirm</button>
                    <button onClick={props.onClose}>Close</button>
                </div>
            </div>
        </ConfirmationDialog>

    );
};

export default DeleteConfirmation;
