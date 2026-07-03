import { useState } from "react";
import arrowIcon from "./assets/icon-arrow.svg";
import DataField from "./DataField";
import "./App.css";

type FieldName = "day" | "month" | "year";

function App() {
    const [selectedDate, setSelectedDate] = useState({
        day: { value: "", error: "" },
        month: { value: "", error: "" },
        year: { value: "", error: "" },
    });

    const isValidDate = (year: number, month: number, day: number) => {
        const date = new Date();
        date.setFullYear(year, month - 1, day);
        return (
            date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day
        );
    };

    const [calculatedDate, setCalculatedDate] = useState({
        years: 0,
        months: 0,
        days: 0,
    });

    const calculateDate = (date: Date) => {
        const dateNow = new Date();
        let years = dateNow.getFullYear() - date.getFullYear();
        let months = dateNow.getMonth() - date.getMonth();
        let days = dateNow.getDate() - date.getDate();

        if (days < 0) {
            months--;
            const lastDayOfPrevMonths = new Date(
                dateNow.getFullYear(),
                dateNow.getMonth(),
                0,
            ).getDate();
            days += lastDayOfPrevMonths;
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        return { years, months, days };
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const dateNow = new Date();
        let hasError = false;
        const newObj = {
            day: { ...selectedDate.day },
            month: { ...selectedDate.month },
            year: { ...selectedDate.year },
        };

        const newDate = new Date();
        newDate.setFullYear(
            +newObj.year.value,
            +newObj.month.value - 1,
            +newObj.day.value,
        );

        for (const key of Object.keys(newObj) as FieldName[]) {
            if (newObj[key].value.trim() === "") {
                newObj[key].error = "This field is required";
                hasError = true;
            } else {
                newObj[key].error = "";
            }
        }
        if (!hasError) {
            if (
                !isValidDate(
                    +newObj.year.value,
                    +newObj.month.value,
                    +newObj.day.value,
                )
            ) {
                newObj.day.error = "Must be a valid date";
                hasError = true;
            }

            if (newDate > dateNow) {
                newObj.day.error = "Must be a date in past";
                hasError = true;
            }
        }

        setSelectedDate(newObj);

        if (!hasError) {
            setCalculatedDate(calculateDate(newDate));
        }
    };

    return (
        <>
            <div className="wrapper">
                <form noValidate onSubmit={handleSubmit}>
                    <div className="inputs">
                        <DataField
                            name="Day"
                            id="day"
                            placeholder="DD"
                            value={selectedDate.day.value}
                            error={selectedDate.day.error}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => {
                                if (e.target.value.length > 2)
                                    e.target.value = e.target.value.slice(0, 2);
                                if (parseInt(e.target.value) > 31)
                                    e.target.value = "31";
                                if (parseInt(e.target.value) < 0)
                                    e.target.value = "0";
                                setSelectedDate({
                                    ...selectedDate,
                                    day: {
                                        value: e.target.value,
                                        error: "",
                                    },
                                });
                            }}
                        />
                        <DataField
                            name="Month"
                            id="month"
                            placeholder="MM"
                            value={selectedDate.month.value}
                            error={
                                selectedDate.day.error ==
                                    "Must be a date in past" ||
                                selectedDate.day.error == "Must be a valid date"
                                    ? selectedDate.day.error
                                    : selectedDate.month.error
                            }
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => {
                                if (e.target.value.length > 2)
                                    e.target.value = e.target.value.slice(0, 2);
                                if (parseInt(e.target.value) > 12)
                                    e.target.value = "12";
                                if (parseInt(e.target.value) < 0)
                                    e.target.value = "0";
                                setSelectedDate({
                                    ...selectedDate,
                                    month: {
                                        value: e.target.value,
                                        error: "",
                                    },
                                });
                            }}
                        />
                        <DataField
                            name="Year"
                            id="year"
                            placeholder="YYYY"
                            value={selectedDate.year.value}
                            error={
                                selectedDate.day.error ==
                                    "Must be a date in past" ||
                                selectedDate.day.error == "Must be a valid date"
                                    ? selectedDate.day.error
                                    : selectedDate.year.error
                            }
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => {
                                if (e.target.value.length > 4)
                                    e.target.value = e.target.value.slice(0, 4);
                                if (
                                    parseInt(e.target.value) >
                                    new Date().getFullYear()
                                )
                                    e.target.value = "2026";
                                if (parseInt(e.target.value) < 0)
                                    e.target.value = "0";
                                setSelectedDate({
                                    ...selectedDate,
                                    year: {
                                        value: e.target.value,
                                        error: "",
                                    },
                                });
                            }}
                        />
                    </div>
                    <div className="sect">
                        <div className="line"></div>
                        <button type="submit" className="submit-btn">
                            <img src={arrowIcon} alt="arrowIcon" />
                        </button>
                    </div>
                </form>
                <div className="main-block">
                    <div className="years">
                        <span>{calculatedDate?.years || "--"}</span> years
                    </div>
                    <div className="months">
                        <span>{calculatedDate?.months || "--"}</span> months
                    </div>
                    <div className="days">
                        <span>{calculatedDate?.days || "--"}</span> days
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
