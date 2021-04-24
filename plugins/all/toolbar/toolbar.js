import React from "react";
import DateObject from "react-date-object";
import { getBorderClass, getValidProps } from "../utils";
import "./toolbar.css";

export default function Toolbar({
  state,
  handleChange,
  position,
  calendarProps,
  nodes,
  className,
  names,
  sort = ["today", "deselect", "close"],
  ...props
}) {
  let { locale, range, multiple } = state,
    name = {
      fa: { today: "امروز", deselect: "لغو", close: "بستن" },
      en: { today: "Today", deselect: "Deselect", close: "Close" },
    },
    localeName = names || name[locale] || name.en,
    classNames = ["rmdp-toolbar", position, getBorderClass(position, nodes)],
    getButton = (name, index) =>
      ({
        today: (
          <div key={index} onClick={selectToday}>
            {localeName.today}
          </div>
        ),
        deselect: (
          <div key={index} onClick={deselect}>
            {localeName.deselect}
          </div>
        ),
        close: calendarProps.datePickerRef && (
          <div key={index} onClick={close}>
            {localeName.close}
          </div>
        ),
      }[name]);

  return (
    <div
      className={`${classNames.join(" ")} ${className}`}
      {...getValidProps(props)}
    >
      {sort.map(getButton)}
    </div>
  );

  function selectToday() {
    let { calendar, format, selectedDate } = state,
      today = new DateObject({ calendar, locale, format });

    if (range) {
      if (!selectedDate) selectedDate = [];

      if (selectedDate.length === 0) {
        selectedDate.push(today);
      } else if (selectedDate.length === 2) {
        selectedDate = [today];
      } else if (selectedDate.length === 1) {
        selectedDate.push(today);
        selectedDate.sort((a, b) => a - b);
      }
    } else if (multiple) {
      selectedDate = [today];
    } else {
      selectedDate = today;
    }

    handleChange(selectedDate, { ...state, selectedDate });
  }

  function deselect() {
    let selectedDate = range || multiple ? [] : null;

    handleChange(selectedDate, { ...state, selectedDate });
  }

  function close() {
    calendarProps.datePickerRef.current.closeCalendar();
  }
}
