import React from 'react';
import {Button} from 'react-native-paper';
import {DatePickerModal} from 'react-native-paper-dates';
import {add} from 'date-fns';
import {untilExpires} from '../../utils/date';
import {
  CalendarDate,
  SingleChange,
} from 'react-native-paper-dates/lib/typescript/src/Date/Calendar';

const DatePicker = (props: {value: Date; setDate: (date: Date) => void}) => {
  const {value, setDate} = props;
  const [open, setOpen] = React.useState(false);
  const until = value ? untilExpires(value) : '';
  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = (params: {date: CalendarDate}) => {
    setOpen(false);
    const date = params.date as Date;
    setDate(date);
  };

  return (
    <>
      <Button
        icon="calendar-clock"
        onPress={() => setOpen(true)}
        uppercase={false}
        mode="outlined">
        Laina-aika: {until}
      </Button>
      <DatePickerModal
        locale={'fi'}
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        date={value}
        onConfirm={onConfirmSingle}
        validRange={{
          startDate: new Date(),
        }}
        // onChange={} // same props as onConfirm but triggered without confirmed by user
        saveLabel="Valitse" // optional
        label="Valitse päivä" // optional
        // animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
      />
    </>
  );
};

export default DatePicker;
