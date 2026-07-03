import "./DataField.css";

type DataFieldType = {
    name: string;
    id: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: string;
};

export default function DataField({
    name,
    id,
    placeholder,
    value,
    onChange,
    error,
}: DataFieldType) {
    return (
        <>
            <label htmlFor={id} className={error ? "error-label" : ""}>
                {name}
                <input
                    className={error ? "error-input" : ""}
                    type="number"
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (["+", "-", "e", "E"].includes(e.key)) {
                            e.preventDefault();
                        }
                    }}
                />
                <span className="error-text">
                    {name == "Day"
                        ? error
                        : error == "Must be a date in past" ||
                            error == "Must be a valid date"
                          ? ""
                          : error}
                </span>
            </label>
        </>
    );
}
