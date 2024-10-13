import React, { useState, useRef, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import { addYears } from 'date-fns'; // Ensure this import is correct
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const DateRangeComp = ({ setStartDate, setEndDate }) => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addYears(new Date(), 1), // Example usage of addYears
      key: 'selection'
    }
  ]);
  const [open, setOpen] = useState(false);
  const refOne = useRef(null);

  const handleClickOutside = (event) => {
    if (refOne.current && !refOne.current.contains(event.target)) {
      setOpen(false);
    }
  };

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setRange([ranges.selection]);

    const start = {
      day: startDate.getDate(),
      month: startDate.getMonth() + 1, // Months are zero-indexed
      year: startDate.getFullYear()
    };

    const end = {
      day: endDate.getDate(),
      month: endDate.getMonth() + 1,
      year: endDate.getFullYear()
    };

    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <input
        value={`${format(range[0].startDate, "MM/dd/yyyy")} to ${format(range[0].endDate, "MM/dd/yyyy")}`}
        readOnly
        className="inputBox"
        onClick={() => setOpen(!open)}
      />
      <div ref={refOne}>
        {open && (
          <DateRange
            ranges={range}
            onChange={handleSelect}
          />
        )}
      </div>
    </div>
  );
};

export default DateRangeComp;