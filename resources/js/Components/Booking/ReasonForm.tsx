interface IReasonForm {
    setShowTextBox: (status: boolean) => void;
}

export default function ReasonForm({ setShowTextBox }: IReasonForm) {
    return (
        <div className="mb-12">
            <h1>TextBoxForm</h1>
            <button
                onClick={() => {
                    setShowTextBox(false);
                }}
            >
                back
            </button>
        </div>
    );
}
