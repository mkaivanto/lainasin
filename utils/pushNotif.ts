import PushNotification from 'react-native-push-notification';
import {Loan} from '../types/loan';

export const scheduleNotification = (loan: Loan) => {
  const expires = new Date(loan.expires);
  expires.setHours(12); // at 12:00

  PushNotification.localNotificationSchedule({
    title: 'Laina on erääntynyt',
    message: `Lainaamasi ${loan.item} on erääntynyt. Muistuta lainaajaa ${loan.borrower}.`,
    date: expires,
    allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
    id: loan.id || undefined,
  });
  getScheduledNotifications();
};

export const removeScheduledNotification = (loanId: number | null) => {
  if (loanId)
    PushNotification.cancelLocalNotifications({id: loanId.toString()});
  getScheduledNotifications();
};

const getScheduledNotifications = () => {
  PushNotification.getScheduledLocalNotifications(notifs =>
    console.log(notifs),
  );
};

export const cleanNotifications = (loans: Loan[]) => {
  const loanIds = loans.reduce((prev, curr) => {
    if (curr.id) return [...prev, curr.id.toString()];
    return prev;
  }, [] as string[]);
  PushNotification.getScheduledLocalNotifications(notifs => {
    const lostNotifs = notifs.reduce((prev, curr) => {
      if (curr.id && !loanIds.includes(curr.id.toString()))
        return [...prev, curr.id];
      return prev;
    }, [] as number[]);
    console.log('lost notifications', lostNotifs);
    lostNotifs.forEach((id: number) => removeScheduledNotification(id));
  });
};
